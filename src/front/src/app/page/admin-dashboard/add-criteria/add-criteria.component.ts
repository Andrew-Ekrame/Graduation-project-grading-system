import { Component, DestroyRef, inject, signal } from '@angular/core';
import { AddCriteriaService } from '../../../services/APIS/add-criteria.service';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-criteria',
  imports: [PopupStatusMessageComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './add-criteria.component.html',
  styleUrl: './add-criteria.component.css',
})
export class AddCriteriaComponent {
  //testing limiting admin role to team criteria only (success : worked as expected)
  selectedGivenBy = signal<'Admin' | 'Supervisor' | 'Examiner'>('Examiner');
  //end test
  private destroyRef = inject(DestroyRef);
  private createCriteriaService = inject(AddCriteriaService);
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
      { validators: [Validators.required] }
    ),
    term: new FormControl<'First-Term' | 'Second-Term'>('First-Term', {
      validators: [Validators.required],
    }),
  });
  //popup
  showPopup = signal<boolean>(false);
  status = signal<boolean>(false);
  message = signal<string>('');
  showConfirm = signal<boolean>(false);

  closePopup() {
    this.showPopup.set(false);
    this.message.set('');
    this.status.set(false);
  }
  showPopupMessage(message: string, status: boolean) {
    this.showPopup.set(true);
    this.message.set(message);
    this.status.set(status);
  }
  showConfirmation() {
    if (this.form.valid) {
      this.showConfirm.set(true);
    }
  }
  cancelConfirmation() {
    this.showConfirm.set(false);
  }
  //submit
  onSubmit() {
    if (this.form.valid) {
      const body: {
        name: string;
        description: string;
        maxGrade: number;
        evaluator: 'Examiner' | 'Supervisor' | 'Admin';
        givenTo: 'Team' | 'Student';
        specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS';
        term: 'First-Term' | 'Second-Term';
      } = {
        name: this.form.value.name!,
        description: this.form.value.description!,
        maxGrade: this.form.value.maxGrade!,
        evaluator: this.form.value.evaluator!,
        givenTo: this.form.value.givenTo!,
        specialty: this.form.value.specialty!,
        term: this.form.value.term!,
      };
      this.showConfirm.set(false);
      const subscription = this.createCriteriaService
        .createCriteria(body)
        .subscribe({
          next: () => {
            this.showPopupMessage('Criteria added successfully', true);
            this.form.reset({
              name: '',
              description: '',
              maxGrade: 0,
              evaluator: 'Examiner',
              givenTo: 'Team',
              specialty: 'CS',
              term: 'First-Term',
            });
          },
          error: (err) => {
            this.showPopupMessage(err.error.message, false);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }
}
