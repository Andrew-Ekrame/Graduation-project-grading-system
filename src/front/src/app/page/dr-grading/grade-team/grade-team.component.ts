import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  CriteriaExaminer,
  TeamForGradingExaminer,
} from '../../../services/models/teams-for-grading-examiner.model';
import { NgClass } from '@angular/common';
import { GetTeamsForDrGradingService } from '../../../services/APIS/get-teams-for-dr-grading.service';
import { Submission } from '../../../services/models/post-gradings-dr.model';

interface ConfirmationData {
  title: string;
  grades: { criteriaName: string; grade: number }[];
  submission: any;
}

@Component({
  selector: 'app-grade-team',
  templateUrl: './grade-team.component.html',
  styleUrls: ['./grade-team.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
})
export class GradeTeamComponent {
  closeGrading = output();
  team = input.required<TeamForGradingExaminer>();
  criteria = input.required<CriteriaExaminer[]>();
  gradedStatus = computed(() => {
    return this.team().teamMembers.map((t) => false);
  });
  goBack() {
    this.closeGrading.emit();
  }
  //services
  private gradingService = inject(GetTeamsForDrGradingService);
  private destroyRef = inject(DestroyRef);

  //form building
  teamGradingForm: FormGroup;
  studentGradingForm: FormGroup;
  teamCriterias = signal<CriteriaExaminer[]>([]);
  studentCriterias = signal<CriteriaExaminer[]>([]);
  selectedStudentId = signal<number | null>(null);
  selectedStudentIndex = signal<number | null>(null);
  selectedStudentName = signal<string>('');

  //checks if user started grading block the back button
  finishedGradingTeam = signal<boolean>(false);
  finishedGradingStudents = signal<boolean>(false);
  startedGrading = signal<boolean>(false);
  isBackButtonDisabled(): boolean {
    return (
      this.startedGrading() &&
      !(this.finishedGradingTeam() && this.finishedGradingStudents())
    );
  }
  //

  constructor(private fb: FormBuilder) {
    this.teamGradingForm = this.fb.group({
      grades: this.fb.array([]),
    });
    this.studentGradingForm = this.fb.group({
      grades: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.initializeForms();
  }

  get teamGrades(): FormArray {
    return this.teamGradingForm.get('grades') as FormArray;
  }

  get studentGrades(): FormArray {
    return this.studentGradingForm.get('grades') as FormArray;
  }

  initializeForms() {
    this.teamCriterias.set(this.criteria().filter((c) => c.givenTo === 'Team'));
    this.studentCriterias.set(
      this.criteria().filter((c) => c.givenTo === 'Student')
    );

    // Initialize team grades
    this.teamCriterias().forEach((criteria) => {
      this.teamGrades.push(
        this.fb.group({
          criteriaId: [criteria.id, Validators.required],
          grade: [
            0,
            [
              Validators.required,
              Validators.min(0),
              Validators.max(criteria.maxGrade),
            ],
          ],
        })
      );
    });
  }

  selectStudent(studentId: number, index: number) {
    this.selectedStudentIndex.set(index);
    this.selectedStudentId.set(studentId);
    const selectedMember = this.team().teamMembers.find(
      (m) => m.id === studentId
    );
    this.selectedStudentName.set(selectedMember?.fullName || '');

    // Reset and initialize student grades
    this.studentGrades.clear();
    this.studentCriterias().forEach((criteria) => {
      this.studentGrades.push(
        this.fb.group({
          criteriaId: [criteria.id, Validators.required],
          grade: [
            0,
            [
              Validators.required,
              Validators.min(0),
              Validators.max(criteria.maxGrade),
            ],
          ],
        })
      );
    });
  }

  //submit the data
  private onTeamSubmit(submission: Submission) {
    // console.log('Team Submission:', submission);
    const subscription = this.gradingService.postGrading(submission).subscribe({
      next: (res) => {
        this.emitPopup('Team graded successfully', true);
        // Mark team grading as finished
        this.startedGrading.set(true);
        this.finishedGradingTeam.set(true);
      },
      error: (err) => {
        // console.log(err);
        this.emitPopup(err.error.message, false);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private onStudentSubmit(submission: Submission) {
    // console.log('Student Submission:', submission);
    const subscription = this.gradingService.postGrading(submission).subscribe({
      next: (res) => {
        this.emitPopup('Student graded successfully', true);
        this.startedGrading.set(true);
        // Mark the student as graded
        const studentIndex = this.team().teamMembers.findIndex(
          (m) => m.id === this.selectedStudentId()
        );
        if (studentIndex !== -1) {
          this.gradedStatus()[studentIndex] = true;
        }

        // Check if all students are graded
        const allStudentsGraded = this.gradedStatus().every(
          (status) => status === true
        );
        if (allStudentsGraded) {
          this.finishedGradingStudents.set(true);
        }
      },
      error: (err) => {
        // console.log(err);
        this.emitPopup(err.error.message, false);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  // Signals for confirmation dialog
  showConfirmDialog = signal<boolean>(false);
  confirmData = signal<ConfirmationData | null>(null);
  confirmType = signal<'team' | 'student' | null>(null);
  prepareTeamConfirmation() {
    if (this.teamGradingForm.valid) {
      const formValue = this.teamGradingForm.value;
      const submission = {
        scheduleId: this.team().scheduleId,
        teamId: this.team().teamId,
        studentId: null,
        grades: formValue.grades.map((g: any) => ({
          criteriaId: g.criteriaId,
          grade: g.grade,
        })),
      };
      const confirmData: ConfirmationData = {
        title: 'Confirm Team Grades Submission',
        grades: formValue.grades.map((g: any) => {
          const criteria = this.teamCriterias().find(
            (c) => c.id === g.criteriaId
          )!;
          return {
            criteriaName: criteria.name,
            grade: g.grade,
          };
        }),
        submission,
      };

      this.confirmData.set(confirmData);
      this.confirmType.set('team');
      this.showConfirmDialog.set(true);
    }
  }
  prepareStudentConfirmation() {
    if (this.studentGradingForm.valid && this.selectedStudentId) {
      const formValue = this.studentGradingForm.value;
      const submission = {
        scheduleId: this.team().scheduleId,
        teamId: this.team().teamId,
        studentId: this.selectedStudentId(),
        grades: formValue.grades.map((g: any) => ({
          criteriaId: g.criteriaId,
          grade: g.grade,
        })),
      };
      const confirmData: ConfirmationData = {
        title: 'Confirm Team Grades Submission',
        grades: formValue.grades.map((g: any) => {
          const criteria = this.studentCriterias().find(
            (c) => c.id === g.criteriaId
          )!;
          return {
            criteriaName: criteria.name,
            grade: g.grade,
          };
        }),
        submission,
      };
      this.confirmData.set(confirmData);
      this.confirmType.set('student');
      this.showConfirmDialog.set(true);
    }
  }
  confirmSubmission() {
    const confirmType = this.confirmType();
    const submission = this.confirmData()?.submission;
    if (confirmType && submission) {
      if (confirmType === 'team') {
        this.onTeamSubmit(submission);
      } else if (confirmType === 'student') {
        this.onStudentSubmit(submission);
      }
    }
    this.showConfirmDialog.set(false);
    this.confirmData.set(null);
    this.confirmType.set(null);
  }

  cancelConfirmation() {
    this.showConfirmDialog.set(false);
    this.confirmData.set(null);
    this.confirmType.set(null);
  }

  //popup
  popup = output<{ message: string; status: boolean }>();
  emitPopup(message: string, status: boolean) {
    this.popup.emit({ message, status });
  }
}
