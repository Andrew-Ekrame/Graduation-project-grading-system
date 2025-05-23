import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginInput } from '../../services/models/login-input.model';
import { StoringUserService } from '../../services/auth/storing-user.service';
import { LoginApiSuccess } from '../../services/models/login-api-success.model';
import { UserObjectModel } from '../../services/models/user-object.model';
import { NotificationsSignalrService } from '../../services/realtime/notifications/notifications-signalr.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private destroyRef = inject(DestroyRef);
  private loginService = inject(LoginService);
  private storingService = inject(StoringUserService);
  private notificationsSignalrService = inject(NotificationsSignalrService);
  private router = inject(Router);
  error = signal<null | string>(null);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      const user: LoginInput = {
        email: this.form.controls.email.value!,
        password: this.form.controls.password.value!,
      };
      const subscription = this.loginService.login(user).subscribe({
        next: (resData) => {
          const loginRes = resData as LoginApiSuccess;
          if (loginRes.data?.token) {
            this.storingService.saveToken(loginRes.data.token);
            this.getUserProfile();
          } else {
            // console.error('Token is null');
          }
        },
        error: (error) => {
          // console.error(error.error.message);
          this.error.set(error.error.message);
        },
      });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      return;
    }
  }

  getUserProfile() {
    const subscription = this.loginService.userProfile().subscribe({
      next: (res) => {
        const resData = res as UserObjectModel;
        this.storingService.saveProfile(resData.data);
        // Initialize SignalR connection
        this.notificationsSignalrService.initializeConnection();
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // console.error(error.error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  controlIsInvalid(control: FormControl) {
    return control.invalid && control.dirty && control.touched;
  }
}
