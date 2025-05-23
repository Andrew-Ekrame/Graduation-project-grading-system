import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegistrationService } from '../../services/auth/registration.service';
import { catchError, throwError } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ResendOtpService } from '../../services/auth/resend-otp.service';

function passwordValidator(pass: AbstractControl) {
  const hasUppercase = /[A-Z]/.test(pass.value);
  const hasLowercase = /[a-z]/.test(pass.value);
  const hasSymbol = /[^a-zA-Z0-9]/.test(pass.value);
  const hasNumber = /\d/.test(pass.value);
  if (hasLowercase && hasUppercase && hasSymbol && hasNumber) {
    return null;
  }
  let error = {};
  if (!hasLowercase) {
    error = { ...error, noLowerCase: true };
  }
  if (!hasUppercase) {
    error = { ...error, noUpperCase: true };
  }
  if (!hasNumber) {
    error = { ...error, noNumber: true };
  }
  if (!hasSymbol) {
    error = { ...error, noSymbol: true };
  }
  return error;
}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  //register
  error = signal<null | string>(null);
  formData = new FormData();
  form = new FormGroup({
    fullName: new FormControl('', {
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    specialty: new FormControl<'CS' | 'CS & MATH' | 'CS & STAT' | 'CS & PHYS'>(
      'CS',
      {
        validators: [Validators.required],
      }
    ),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        passwordValidator,
      ],
    }),
  });

  private destroyRef = inject(DestroyRef);
  private registrationService = inject(RegistrationService);
  onSubmit() {
    if (this.form.valid && this.formData.get('ProfilePicture')) {
      this.error.set(null);
      const data = this.form.value;
      this.formData.append('FullName', data.fullName ?? '');
      this.formData.append('Email', data.email ?? '');
      this.formData.append('Password', data.password ?? '');
      this.formData.append('Specialty', data.specialty ?? '');
      this.formData.append('ProfilePicture', this.file ?? '');
      // console.log(this.formData);
      const subscription = this.registrationService
        .register(this.formData)
        .pipe(
          catchError((error) => {
            // console.error('API Error:', error); // Log full error for debugging
            // Extract message from API response
            const errorMessage = error.error?.message || 'Something went wrong';
            return throwError(() => new Error(errorMessage));
          })
        )
        .subscribe({
          next: (resData: any) => {
            if (resData.statusCode === 200) {
              this.error.set(null);
              this.showOTP = true;
            }
          },
          error: (error: Error) => {
            // console.log(error.message);
            this.error.set(error.message);
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      this.error.set('Please complete the form correctly');
    }
  }

  //handling photo upload
  photoError = signal<null | string>(null);
  file: File | null = null;
  onFileSelect(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.photoError.set(null);
      // console.log(this.file);
      this.formData.append('ProfilePicture', this.file);
    } else {
      this.photoError.set('Please select an image file');
    }
  }
  //checker for invalidation
  controlIsInvalid(control: FormControl) {
    return control.invalid && control.dirty && control.touched;
  }

  //otp
  showOTP: boolean = false;
  otpError: string | null = null;
  private router = inject(Router);
  private resentOtpService = inject(ResendOtpService);
  otpForm = new FormGroup({
    otp1: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(9),
        Validators.maxLength(1),
        Validators.minLength(1),
      ],
    }),
    otp2: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(9),
        Validators.maxLength(1),
        Validators.minLength(1),
      ],
    }),
    otp3: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(9),
        Validators.maxLength(1),
        Validators.minLength(1),
      ],
    }),
    otp4: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(9),
        Validators.maxLength(1),
        Validators.minLength(1),
      ],
    }),
    otp5: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(9),
        Validators.maxLength(1),
        Validators.minLength(1),
      ],
    }),
    otp6: new FormControl('', {
      validators: [
        Validators.required,
        Validators.min(0),
        Validators.max(9),
        Validators.maxLength(1),
        Validators.minLength(1),
      ],
    }),
  });
  onSubmitOTP() {
    if (this.otpForm.valid) {
      this.otpError = null;
      // console.log(this.otpForm.value);
      let otpString = '';
      otpString += this.otpForm.controls.otp1.value;
      otpString += this.otpForm.controls.otp2.value;
      otpString += this.otpForm.controls.otp3.value;
      otpString += this.otpForm.controls.otp4.value;
      otpString += this.otpForm.controls.otp5.value;
      otpString += this.otpForm.controls.otp6.value;
      // console.log(otpString);
      //api call
      const subscription = this.registrationService
        .sendOTP(otpString)
        .pipe(
          catchError((error) => {
            // console.error('API Error:', error); // Log full error for debugging
            // Extract message from API response
            const errorMessage = error.error?.message || 'Something went wrong';
            return throwError(() => new Error(errorMessage));
          })
        )
        .subscribe({
          next: (resData: any) => {
            // console.log('Verification success', resData.message ?? '');
            this.otpError = resData.message ?? '';
            setTimeout(() => this.router.navigate(['/login']), 2000);
          },
          error: (error: Error) => {
            // console.log(error.message);
            this.otpError = error.message;
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      this.otpError = 'Please enter the full OTP code';
      return;
    }
  }
  resendOTP() {
    if (!this.form.valid) return;
    const subscription = this.resentOtpService
      .resendOtp(this.form.value.email!)
      .subscribe({
        next: (res) => {
          this.otpError = res.message ?? 'OTP resent successfully';
        },
        error: (err) => {},
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
