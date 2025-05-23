import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import {
  CriteriaAdmin,
  TeamAdmin,
} from '../../../services/models/teams-for-evaluation-by-admin.model';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';
import { GetPreviousGradesForTeamService } from '../../../services/APIS/get-previous-grades-for-team.service';
import {
  Evaluation,
  EvaluationResponse,
} from '../../../services/models/old-grades.model';

@Component({
  selector: 'app-team-card-admin-grading',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './team-card-admin-grading.component.html',
  styleUrl: './team-card-admin-grading.component.css',
})
export class TeamCardAdminGradingComponent {
  team = input.required<TeamAdmin>();
  filteredCriterias = input.required<CriteriaAdmin[]>();
  form!: FormGroup;
  loading = signal<boolean>(true);
  constructor(private fb: FormBuilder) {}

  private getPreviousGradesService = inject(GetPreviousGradesForTeamService);
  private destroyRef = inject(DestroyRef);
  previousGrades = signal<Evaluation[]>([]);
  ngOnInit() {
    const subscription = this.getPreviousGradesService
      .getPreviousGradesForTeam(this.team().teamId, this.team().scheduleId)
      .subscribe({
        next: (res) => {
          const resData = res as EvaluationResponse;
          this.previousGrades.set(resData.data.evaluations);
          // Create the form based on the given criteria
          const criteriaArray = this.filteredCriterias().map((c) =>
            this.fb.group({
              grade: [
                //if old grade found put its value
                this.previousGrades().find((p) => p.criteriaId === c.id)
                  ?.grade ?? 0,
                [
                  Validators.required,
                  Validators.min(0),
                  Validators.max(c.maxGrade),
                ],
              ],
              criteriaId: [c.id, Validators.required],
            })
          );
          this.form = this.fb.group({
            grades: this.fb.array(criteriaArray),
            teamId: [this.team().teamId, Validators.required],
            scheduleId: [this.team().scheduleId, Validators.required],
          });
          this.loading.set(false);
        },
        error: (err) => {
          // console.log(err);
          // If no previous grades, set the form normally
          const criteriaArray = this.filteredCriterias().map((c) =>
            this.fb.group({
              grade: [
                //no grade found
                0,
                [
                  Validators.required,
                  Validators.min(0),
                  Validators.max(c.maxGrade),
                ],
              ],
              criteriaId: [c.id, Validators.required],
            })
          );
          this.form = this.fb.group({
            grades: this.fb.array(criteriaArray),
            teamId: [this.team().teamId, Validators.required],
            scheduleId: [this.team().scheduleId, Validators.required],
          });
          this.loading.set(false);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  get teamGrades(): FormArray {
    return this.form.get('grades') as FormArray;
  }

  outputForm = output<{
    teamId: number;
    scheduleId: number;
    grades: { criteriaId: number; grade: number }[];
  }>();
  submitForm(): void {
    if (this.form.valid) {
      const data = {
        teamId: this.form.value.teamId!,
        scheduleId: this.form.value.scheduleId!,
        grades: this.form.value.grades.map(
          (g: { criteriaId: number; grade: number }) => ({
            criteriaId: g.criteriaId,
            grade: g.grade,
          })
        )!,
      };
      this.outputForm.emit(data);
    }
  }
}
