import { Component, computed, input, output, signal } from '@angular/core';
import { TeamForSchedule } from '../../../../services/models/create-schedule.model';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExaminerSelectionCardComponent } from './examiner-selection-card/examiner-selection-card.component';
import { Doctor } from '../../../../services/models/get-allDoctors.model';

function examinerArrayValidator(min: number, max: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const examiners = control.value as number[];
    if (!Array.isArray(examiners)) {
      return { invalidFormat: true };
    }
    if (examiners.length < min) {
      return { tooFew: true };
    }
    if (examiners.length > max) {
      return { tooMany: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-team-schedule-form',
  standalone: true,
  templateUrl: './team-schedule-form.component.html',
  styleUrl: './team-schedule-form.component.css',
  imports: [ReactiveFormsModule, CommonModule, ExaminerSelectionCardComponent],
})
export class TeamScheduleFormComponent {
  team = input.required<TeamForSchedule>();
  createSchedule = output<{
    teamId: number;
    date: string;
    examiners: number[];
  }>();
  selectedExaminers = signal<number[]>([]);
  scheduleForm = new FormGroup({
    scheduleDate: new FormControl<string>('', {
      validators: [Validators.required],
    }),
    examiners: new FormControl<number[]>([], {
      validators: [examinerArrayValidator(1, 3)],
    }),
  });
  examiners = input.required<Doctor[]>();
  filteredExaminers = computed(() => {
    return this.examiners().filter(
      (examiner) => examiner.doctorId !== this.team().supervisorId
    );
  });
  onReset() {
    this.scheduleForm.reset();
    this.selectedExaminers.set([]);
  }

  onConfirm() {
    if (this.scheduleForm.valid && this.selectedExaminers().length > 0) {
      const formValue = {
        ...this.scheduleForm.value,
        examiners: this.selectedExaminers(),
      };
      // Convert the date string to a proper datetime format
      const dateStr = formValue.scheduleDate!;
      const formattedDate = new Date(dateStr).toISOString();
      // console.log('Schedule confirmed:', formValue);
      this.createSchedule.emit({
        teamId: this.team().id,
        date: formattedDate,
        examiners: formValue.examiners,
      });
    }
  }

  onExaminerSelect(examinerId: number) {
    const currentSelected = this.selectedExaminers();
    if (currentSelected.includes(examinerId)) {
      // Remove if already selected
      this.selectedExaminers.set(
        currentSelected.filter((id) => id !== examinerId)
      );
    } else if (currentSelected.length < 3) {
      // Add if less than 3 examiners are selected
      this.selectedExaminers.set([
        ...currentSelected.filter((id) => id !== -1),
        examinerId,
      ]);
    }
    this.scheduleForm.patchValue({ examiners: this.selectedExaminers() });
  }
}
