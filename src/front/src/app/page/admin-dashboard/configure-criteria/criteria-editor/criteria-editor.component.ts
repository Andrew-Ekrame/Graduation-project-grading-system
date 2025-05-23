import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Criteria } from '../../../../services/models/criteria-list.model';

@Component({
  selector: 'app-criteria-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criteria-editor.component.html',
  styleUrl: './criteria-editor.component.css',
})
export class CriteriaEditorComponent {
  editedCriteria = input.required<Criteria>();
  closeEditor = output<boolean>();
  editForm = output<{
    id: number;
    name: string;
    description: string;
    maxGrade: number;
    evaluator: 'Examiner' | 'Supervisor' | 'Admin';
    givenTo: 'Team' | 'Student';
    specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS';
    term: 'First-Term' | 'Second-Term';
  }>();
  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', { validators: [Validators.required] }),
    maxGrade: new FormControl<number>(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
    evaluator: new FormControl<'Examiner' | 'Supervisor' | 'Admin'>(
      'Examiner',
      {
        validators: [Validators.required],
      }
    ),
    givenTo: new FormControl<'Team' | 'Student'>('Team', {
      validators: [Validators.required],
    }),
    specialty: new FormControl<'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS'>(
      'CS',
      {
        validators: [Validators.required],
      }
    ),
    term: new FormControl<'First-Term' | 'Second-Term'>('First-Term', {
      validators: [Validators.required],
    }),
  });

  ngOnInit() {
    this.form.patchValue({
      name: this.editedCriteria().name,
      description: this.editedCriteria().description,
      maxGrade: this.editedCriteria().maxGrade,
      evaluator: this.editedCriteria().evaluator,
      givenTo: this.editedCriteria().givenTo,
      specialty: this.editedCriteria().specialty,
      term: this.editedCriteria().term,
    });
  }

  onSubmit() {
    if (this.form.valid) {
      // console.log(this.form.value);
      const criteria = signal({
        name: this.form.value.name!,
        description: this.form.value.description!,
        maxGrade: this.form.value.maxGrade!,
        evaluator: this.form.value.evaluator!,
        givenTo: this.form.value.givenTo!,
        specialty: this.form.value.specialty!,
        term: this.form.value.term!,
        id: this.editedCriteria().id,
      });
      this.editForm.emit(criteria());
    }
  }

  onCancel() {
    this.closeEditor.emit(true);
  }
}
