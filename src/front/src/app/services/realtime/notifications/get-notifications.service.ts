import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  apiGetAllNotifications,
  apiGetDoctorNotifications,
  apiGetStudentNotifications,
  apiReadNotification,
} from '../../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../../auth/storing-user.service';

@Injectable({
  providedIn: 'root',
})
export class GetNotificationsService {
  private apiGetNotificationsAll = apiGetAllNotifications;
  private apiGetNotificationsDr = apiGetDoctorNotifications;
  private apiGetNotificationsSt = apiGetStudentNotifications;
  private apiMarkAsRead = apiReadNotification;
  private storingUserService = inject(StoringUserService);
  private http = inject(HttpClient);
  getAllNotifications() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingUserService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(this.apiGetNotificationsAll, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            // console.log(resData.message);
            throw new Error(resData.message??"Failed to get notifications");
          }
        })
      );
  }

  getStudentNotifications() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingUserService.currentUserTokenPublic()}`,
    });
    return this.http.get(this.apiGetNotificationsSt, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          // console.log(resData.message);
          throw new Error(resData.message??"Failed to get student notifications");
        }
      })
    );
  }

  getDoctorNotifications() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingUserService.currentUserTokenPublic()}`,
    });
    return this.http.get(this.apiGetNotificationsDr, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          // console.log(resData.message);
          throw new Error(resData.message??"Failed to get doctor notifications");
        }
      })
    );
  }

  markAsRead(notificationId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingUserService.currentUserTokenPublic()}`,
    });
    return this.http
      .put(this.apiMarkAsRead + notificationId, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            // console.log(resData.message);
            throw new Error(resData.message??"Failed to mark notification as read");
          }
        })
      );
  }
}
