import { Component, input, output } from '@angular/core';
import { NotificationItemComponent } from '../notification-item/notification-item.component';
import { Notification } from '../../../services/models/notification.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
  imports: [NotificationItemComponent],
})
export class NotificationListComponent {
  notifications = input.required<Notification[]>();
  markAsRead = output<number>();

  onMarkAsRead(notificationId: number) {
    this.markAsRead.emit(notificationId);
  }
}
