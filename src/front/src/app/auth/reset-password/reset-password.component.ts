import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ResetPasswordService } from '../../services/auth/reset-password.service';
import {
  ResetPasswordReq,
  ResetPasswordRes,
} from '../../services/models/reset-password.model';
import { ActivatedRoute, Router } from '@angular/router';

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

function passwordMatchValidator(group: AbstractControl) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  if (password === confirmPassword) {
    return null;
  }
  return { passwordMatch: true };
}

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  form = new FormGroup(
    {
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          passwordValidator,
        ],
      }),
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          passwordValidator,
        ],
      }),
    },
    {
      validators: passwordMatchValidator,
    }
  );
  error = signal<null | string>(null);
  token = signal<string>('');
  email = signal<string>('');
  private destroyRef = inject(DestroyRef);
  private resetPasswordService = inject(ResetPasswordService);
  private router = inject(Router);
  private activeLink = inject(ActivatedRoute);
  onSubmit() {
    if (this.form.valid) {
      this.error.set(null);
      const body: ResetPasswordReq = {
        newPassword: this.form.controls.password?.value,
        confirmPassword: this.form.controls.confirmPassword?.value,
        email: this.email(),
        token: this.token(),
      };
      const subscription = this.resetPasswordService
        .resetPassword(body)
        .subscribe({
          next: (res) => {
            const resData = res as ResetPasswordRes;
            this.error.set(
              resData.message +
                ', You will be redirected to the login page in 3 seconds'
            );
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          },
          error: (error) => {
            this.error.set(error.message);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      // console.log(this.email(), this.token());
      this.error.set(
        'Please fill in the form correctly , Both passwords must match'
      );
      return;
    }
  }
  ngOnInit() {
    const subscription = this.activeLink.queryParams.subscribe({
      next: (params) => {
        this.email.set(params['userEmail']);
        let token = params['token'];
        if (token) {
          token = token.replace(/ /g, '+');
        }
        this.token.set(token);
        // console.log(this.email(), this.token());
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
