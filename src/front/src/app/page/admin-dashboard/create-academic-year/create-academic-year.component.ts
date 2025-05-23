import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { CreateAcademicYearService } from '../../../services/APIS/create-academic-year.service';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component';

//validate that the 2 years have a difference of only one
const yearDifferenceValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const start = group.get('startYear')?.value;
  const end = group.get('endYear')?.value;

  const errors: any = {};

  if (start != null && end != null) {
    if (start === end) {
      errors.yearsEqual = true;
    } else if (start > end) {
      errors.startAfterEnd = true;
    } else if (end - start !== 1) {
      errors.yearDifferenceInvalid = true;
    }
  }

  return Object.keys(errors).length ? errors : null;
};

//validate that the term dates are in order (first start < first end < second start < second end)
const termDateOrderValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const startYear = group.get('startYear')?.value;
  const endYear = group.get('endYear')?.value;
  const firstStart = new Date(group.get('firstTermStart')?.value);
  const firstEnd = new Date(group.get('firstTermEnd')?.value);
  const secondStart = new Date(group.get('secondTermStart')?.value);
  const secondEnd = new Date(group.get('secondTermEnd')?.value);

  // Check if the terms are in order
  const firstTermDates = firstStart < firstEnd;
  const secondTermDates = secondStart < secondEnd;
  const termsOrder = firstEnd < secondStart;

  const errors: any = {};

  // Check if the dates are equal
  if (firstStart.getTime() === firstEnd.getTime()) {
    errors.firstTermEqualDates = true;
  }

  if (secondStart.getTime() === secondEnd.getTime()) {
    errors.secondTermEqualDates = true;
  }

  if (firstEnd.getTime() === secondStart.getTime()) {
    errors.firstTermEndEqualSecondStart = true;
  }

  // Check if the first term dates are valid
  if (!firstTermDates) {
    errors.firstTermOrderInvalid = true;
  }

  // Check if the second term dates are valid
  if (!secondTermDates) {
    errors.secondTermOrderInvalid = true;
  }

  // Check if the first term and second term are in the correct order
  if (firstTermDates && secondTermDates && !termsOrder) {
    errors.termsOrderInvalid = true;
  }

  // Check if the terms are within the selected academic years
  const firstTermStartYear = firstStart.getFullYear();
  const firstTermEndYear = firstEnd.getFullYear();
  const secondTermStartYear = secondStart.getFullYear();
  const secondTermEndYear = secondEnd.getFullYear();

  if (firstTermStartYear < startYear || firstTermEndYear > endYear) {
    errors.firstTermDateOutOfRange = true;
  }

  if (secondTermStartYear < startYear || secondTermEndYear > endYear) {
    errors.secondTermDateOutOfRange = true;
  }

  // Return errors if any
  return Object.keys(errors).length ? errors : null;
};

//combine 2 validators (limitation of reactive form)
const combinedValidator: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const yearErrors = yearDifferenceValidator(group);
  const dateErrors = termDateOrderValidator(group);

  return {
    ...(yearErrors || {}),
    ...(dateErrors || {}),
  };
};

@Component({
  selector: 'app-create-academic-year',
  standalone: true,
  imports: [ReactiveFormsModule, PopupStatusMessageComponent],
  templateUrl: './create-academic-year.component.html',
  styleUrl: './create-academic-year.component.css',
})
export class CreateAcademicYearComponent {
  currentYear = new Date().getFullYear();
  form = new FormGroup(
    {
      startYear: new FormControl<number>(this.currentYear - 1, {
        validators: [Validators.required, Validators.min(2020)],
      }),
      endYear: new FormControl<number>(this.currentYear, {
        validators: [Validators.required, Validators.min(2021)],
      }),
      firstTermStart: new FormControl<String>('', {
        validators: [Validators.required],
      }),
      firstTermEnd: new FormControl<String>('', {
        validators: [Validators.required],
      }),
      secondTermStart: new FormControl<String>('', {
        validators: [Validators.required],
      }),
      secondTermEnd: new FormControl<String>('', {
        validators: [Validators.required],
      }),
    },
    { validators: combinedValidator }
  );

  private createAcademicYear = inject(CreateAcademicYearService);
  private destroyRef = inject(DestroyRef);
  onSubmit() {
    if (this.form.valid) {
      const firstTermStart = this.form.value.firstTermStart ?? '';
      const secondTermStart = this.form.value.secondTermStart ?? '';
      const firstTermEnd = this.form.value.firstTermEnd ?? '';
      const secondTermEnd = this.form.value.secondTermEnd ?? '';
      const body = {
        year: `${this.form.value.startYear}-${this.form.value.endYear}`,
        firstTerm: new Date(firstTermStart.toString()).toISOString(),
        secondTerm: new Date(secondTermStart.toString()).toISOString(),
        firstTermEnd: new Date(firstTermEnd.toString()).toISOString(),
        secondTermEnd: new Date(secondTermEnd.toString()).toISOString(),
      };
      const subscription = this.createAcademicYear
        .createAcademicYear(body)
        .subscribe({
          next: (res) => {
            const resData = res as any;
            this.showPopupMessage(resData.message, true);
            this.form.reset({
              startYear: this.currentYear,
              endYear: this.currentYear,
              firstTermStart: '',
              firstTermEnd: '',
              secondTermStart: '',
              secondTermEnd: '',
            });
          },
          error: (err) => {
            // console.error(err.error.message);
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    }
    return;
  }

  //popup methods
  showPopup = signal<boolean>(false);
  message = signal<string>('');
  status = signal<boolean>(false);
  showPopupMessage(message: string, status: boolean) {
    this.showPopup.set(true);
    this.message.set(message);
    this.status.set(status);
  }
  closePopup() {
    this.showPopup.set(false);
    this.message.set('');
    this.status.set(false);
  }
}
