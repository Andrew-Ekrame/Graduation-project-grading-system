import {
  Component,
  Input,
  Output,
  EventEmitter,
  input,
  output,
} from '@angular/core';
import { Notification } from '../../../services/models/notification.model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.css'],
})
export class NotificationItemComponent {
  notification = input.required<Notification>();
  markAsRead = output<number>();

  onMarkAsRead() {
    this.markAsRead.emit(this.notification().id);
  }
}
