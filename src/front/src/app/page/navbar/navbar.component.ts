import { Component, inject, computed, signal } from '@angular/core';
import { NotificationListComponent } from './notification-list/notification-list.component'; // Import the notification model
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { StoringUserService } from '../../services/auth/storing-user.service';
import { NotificationsSignalrService } from '../../services/realtime/notifications/notifications-signalr.service';
import { Notification } from '../../services/models/notification.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nav[app-navbar]',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host: {
    class: 'navbar',
  },
  imports: [NotificationListComponent, RouterLink, RouterLinkActive, NgClass],
})
export class NavbarComponent {
  isNavbarLinksVisible: boolean = false;
  isNotificationListVisible: boolean = false;
  storageService = inject(StoringUserService);
  private router = inject(Router);
  private signalRService = inject(NotificationsSignalrService);
  notifications = computed<Notification[]>(() =>
    this.signalRService.notificationsPublic()
  );
  unreadNotifications = computed<boolean>(() => {
    return (
      this.notifications().some((notification) => !notification.isRead) &&
      !this.isNotificationListVisible
    );
  });

  toggleNavbarLinks() {
    this.isNavbarLinksVisible = !this.isNavbarLinksVisible;
  }

  toggleNotificationList() {
    this.isNotificationListVisible = !this.isNotificationListVisible;
    this.temporaryMarkAsRead();
  }

  private temporaryMarkAsRead() {
    this.signalRService.markAllAsRead();
  }
  markAsRead(notificationId: number) {
    this.signalRService.markAsRead(notificationId);
  }

  logout() {
    //stop the SignalR connection
    this.signalRService.reset();
    //clear the user token and profile
    this.storageService.logout();
    //navigate to the login page
    this.router.navigate(['/login']);
  }
}
