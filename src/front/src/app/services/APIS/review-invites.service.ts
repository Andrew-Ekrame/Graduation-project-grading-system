import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { ReviewTeamInvitation } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewInvitesService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiInviteResponse = ReviewTeamInvitation;
  reviewInvite(inviteId: number, response: boolean) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const answer = response ? 'Accepted' : 'Rejected';
    const body = {
      invitationId: inviteId,
      newStatus: answer,
    };
    return this.http
      .put(this.apiInviteResponse, body, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to review invite");
          }
        })
      );
  }
}
