import {
  computed,
  DestroyRef,
  inject,
  Injectable,
  OnDestroy,
  signal,
} from '@angular/core';
import { StoringUserService } from '../../auth/storing-user.service';
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { notificationHubUrl } from '../../api-exports.model.';
import {
  Notification,
  NotificationResponse,
} from '../../models/notification.model';
import { GetNotificationsService } from './get-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsSignalrService implements OnDestroy {
  private hubConnection!: HubConnection;
  private storingUserService = inject(StoringUserService);
  private hubUrl = notificationHubUrl;
  private getNotificationsService = inject(GetNotificationsService);
  private destroyRef = inject(DestroyRef);
  private notifications = signal<Notification[]>([]);
  private loading = signal<boolean>(true);
  notificationsPublic = computed<Notification[]>(() => {
    return this.loading() ? [] : this.notifications();
  });

  initializeConnection() {
    this.getOldNotifications();
    this.startConnection();
  }

  reset() {
    this.notifications.set([]);
    this.loading.set(true);
    this.stopConnection();
  }
  private async startConnection() {
    if (this.storingUserService.currentUserTokenPublic()) {
      const token = this.storingUserService.currentUserTokenPublic();
      const role = this.storingUserService.currentUserProfilePublic()?.role;
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.hubUrl, {
          accessTokenFactory: () => token!,
          withCredentials: true,
          transport: HttpTransportType.WebSockets,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .withAutomaticReconnect()
        .build();

      await this.hubConnection
        .start()
        .then(() => {
          // console.log('notification hub connection successful');
          this.joinGroup(role!);
          this.onReceiveNotificationListener();
        })
        .catch((err) => {
          // console.log('Signal r connection error', err)
        });
    }
  }

  private joinGroup(groupName: string) {
    if (this.hubConnection) {
      let role = '';
      if (groupName === 'Student') {
        role = 'Students';
      }
      if (groupName === 'Doctor') {
        role = 'Doctors';
      }
      if (groupName === 'Admin') {
        role = 'All';
      }
      this.hubConnection
        .invoke('JoinGroup', role)
        .then(() => {
          // console.log(`Joined group ${role}`)
        })
        .catch((err) => {
          // console.log('Error joining group', err)
        });
    }
  }
  private stopConnection() {
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then(() => {
          // console.log('SignalR connection stopped')
        })
        .catch((err) => {
          // console.log('Error stopping SignalR connection', err)
        });
    }
  }
  private onReceiveNotificationListener() {
    // console.log('registered listener');
    this.hubConnection.on(
      'ReceiveNotification',
      (notification: Notification) => {
        // console.log('notification received', notification);
        this.notifications.update((old) => {
          return [notification, ...old];
        });
      }
    );
  }

  ngOnDestroy() {
    this.stopConnection();
  }
  private getOldNotifications() {
    const role = this.storingUserService.currentUserProfilePublic()?.role;

    if (role === 'Admin') {
      this.oldAllNotifications();
    }

    if (role === 'Student') {
      this.oldStudentNotifications();
    } else if (role === 'Doctor') {
      this.oldDoctorNotifications();
    }
    this.loading.set(false);
  }
  private oldAllNotifications() {
    const subAll = this.getNotificationsService
      .getAllNotifications()
      .subscribe({
        next: (res) => {
          const resData = res as NotificationResponse;
          this.notifications.update((old) => [
            ...resData.data.notifications.reverse(),
            ...old,
          ]);
          // console.log('retrieved notifications for all users');
        },
        error: (err) => {
          // console.log(err)
        },
      });
    this.destroyRef.onDestroy(() => subAll.unsubscribe());
  }
  private oldStudentNotifications() {
    const subSt = this.getNotificationsService
      .getStudentNotifications()
      .subscribe({
        next: (res) => {
          const resData = res as NotificationResponse;
          this.notifications.update((old) => [
            ...resData.data.notifications.reverse(),
            ...old,
          ]);
          // console.log('retrieved notifications for student');
        },
        error: (err) => {
          // console.log(err)
        },
      });
    this.destroyRef.onDestroy(() => subSt.unsubscribe());
  }
  private oldDoctorNotifications() {
    const subDr = this.getNotificationsService
      .getDoctorNotifications()
      .subscribe({
        next: (res) => {
          const resData = res as NotificationResponse;
          this.notifications.update((old) => [
            ...resData.data.notifications.reverse(),
            ...old,
          ]);
          // console.log('retrieved notifications for doctor');
        },
        error: (err) => {
          // console.log(err)
        },
      });
    this.destroyRef.onDestroy(() => subDr.unsubscribe());
  }
  markAsRead(notificationId: number) {
    const subscription = this.getNotificationsService
      .markAsRead(notificationId)
      .subscribe({
        next: (res) => {
          this.notifications.update((old) =>
            old.map((n) => {
              if (n.id === notificationId) {
                n.isRead = true;
              }
              return n;
            })
          );
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  markAllAsRead() {
    this.notifications.update((old) =>
      old.map((n) => {
        n.isRead = true;
        return n;
      })
    );
  }
}
