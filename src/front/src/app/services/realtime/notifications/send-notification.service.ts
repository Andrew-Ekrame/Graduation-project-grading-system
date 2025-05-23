import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../../auth/storing-user.service';
import { apiSendNotification } from '../../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendNotificationService {
  private storingUserService = inject(StoringUserService);
  private http = inject(HttpClient);
  private apiSendNotification = apiSendNotification;

  sendNotification(data: {
    title: string;
    description: string;
    role: 'All' | 'Students' | 'Doctors';
  }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingUserService.currentUserTokenPublic()}`,
    });
    return this.http
      .post(this.apiSendNotification, data, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to send notification");
          }
        })
      );
  }
}
