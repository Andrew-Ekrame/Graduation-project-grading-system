import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiSendInvitation } from '../api-exports.model.';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SendInviteService {
  private http = inject(HttpClient);
  private apiSendInvite = apiSendInvitation;
  private storingService = inject(StoringUserService);
  sendInvite(leaderId: number, teamId: number, studentId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const body = {
      leaderId: leaderId,
      teamId: teamId,
      studentId: studentId,
    };
    return this.http.post(this.apiSendInvite, body, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !==200) {
          throw new Error(resData.message??"Failed to send invite");
        }
      })
    );
  }
}
