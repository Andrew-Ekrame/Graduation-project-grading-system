import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SendNotificationService } from '../../../services/realtime/notifications/send-notification.service';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component';

@Component({
  selector: 'app-send-instructions',
  imports: [ReactiveFormsModule, PopupStatusMessageComponent],
  templateUrl: './send-instructions.component.html',
  styleUrl: './send-instructions.component.css',
})
export class SendInstructionsComponent {
  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', { validators: [Validators.required] }),
    role: new FormControl<'All' | 'Students' | 'Doctors'>('Students', {
      validators: [Validators.required],
    }),
  });
  private sendNotificationService = inject(SendNotificationService);
  private destroyRef = inject(DestroyRef);
  onSubmit() {
    if (this.form.valid) {
      const data = {
        title: this.form.value.title!,
        description: this.form.value.description!,
        role: this.form.value.role!,
      };
      // console.log('sending notification', data);
      const subscription = this.sendNotificationService
        .sendNotification(data)
        .subscribe({
          next: (res) => {
            this.form.reset({
              title: '',
              description: '',
              role: 'All',
            });
            const resData = res as any;
            this.showPopupMessage(
              resData.message ?? 'Notification sent successfully',
              true
            );
          },
          error: (err) => {
            this.showPopupMessage(err.message, false);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      // console.log('invalid notification data');
      // console.log(this.form.value);
      return;
    }
  }
  //popup
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
