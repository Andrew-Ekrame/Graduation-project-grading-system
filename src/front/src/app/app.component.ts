import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './services/auth/login.service';
import { StoringUserService } from './services/auth/storing-user.service';
import { NotificationsSignalrService } from './services/realtime/notifications/notifications-signalr.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'graduation_project_angular';

  private loginService = inject(LoginService);
  private storingUserService = inject(StoringUserService);
  private notificationsSignalrService = inject(NotificationsSignalrService);

  ngOnInit() {
    if (this.storingUserService.currentUserTokenPublic()) {
      if (!this.storingUserService.checkTokenExpiration()) {
        this.loadUserProfile();
      } else {
        this.storingUserService.logout();
      }
    }
  }

  private loadUserProfile() {
    this.loginService.userProfile().subscribe({
      next: (response: any) => {
        if (response.data) {
          this.storingUserService.saveProfile(response.data);
          // Initialize SignalR connection
          this.notificationsSignalrService.initializeConnection();
        }
      },
      error: (error) => {
        // console.error('Error loading profile:', error);
        this.storingUserService.logout();
      },
    });
  }
}
