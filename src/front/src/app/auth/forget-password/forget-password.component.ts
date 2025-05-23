import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ForgetPasswordService } from '../../services/auth/forget-password.service';
import { ResetPasswordRes } from '../../services/models/reset-password.model';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
  });
  error = signal<string | null>(null);
  private forgetPasswordService = inject(ForgetPasswordService);
  private destroyRef = inject(DestroyRef);
  onSubmit() {
    if (this.form.valid) {
      this.error.set(null);
      const subscription = this.forgetPasswordService
        .forgetPassword(this.form.controls.email?.value || '')
        .subscribe({
          next: (res) => {
            const resData = res as ResetPasswordRes;
            this.error.set(resData.message);
          },
          error: (err) => {
            this.error.set(err.message);
          },
        });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
    } else {
      this.error.set('Please enter a valid email');
    }
  }
}
