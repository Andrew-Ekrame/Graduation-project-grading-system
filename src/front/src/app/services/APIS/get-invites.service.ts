import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiGetTeamInvitations } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetInvitesService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiGetInvites = apiGetTeamInvitations;
  getAllInvites() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.get(this.apiGetInvites, { headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to get invites");
        }
      })
    );
  }
}
