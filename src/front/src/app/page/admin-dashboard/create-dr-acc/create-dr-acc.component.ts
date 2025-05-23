import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CreateDrAccountService } from '../../../services/APIS/create-dr-account.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PopupStatusMessageComponent } from "../../../shared/popup-status-message/popup-status-message.component";

@Component({
  selector: 'app-create-dr-acc',
  standalone: true,
  imports: [ReactiveFormsModule, PopupStatusMessageComponent],
  templateUrl: './create-dr-acc.component.html',
  styleUrl: './create-dr-acc.component.css',
})
export class CreateDrAccComponent {
  private registerDrService = inject(CreateDrAccountService);
  private destroyRef = inject(DestroyRef);
  showMessage = false;
  messageType = '';
  messageText = '';

  form = new FormGroup({
    fullName: new FormControl('', { validators: [Validators.required] }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  onSubmit() {
    if (this.form.valid) {
      const { fullName, email, password } = this.form.value;
      const subscription = this.registerDrService
        .registerDoctor(fullName!, email!, password!)
        .subscribe({
          next: (res) => {
            const resData = res as any;
            this.showPopupMessage(resData.message, true);
          },
          error: (err) => {
            // console.log(err);
            this.showPopupMessage(err.error.message, false);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      return;
    }
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
