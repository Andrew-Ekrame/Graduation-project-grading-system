import { inject, Injectable } from '@angular/core';
import { apiGetTeamMembers } from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetTeamMembersService {
  private apiGetTeamMembers = apiGetTeamMembers;
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  getTeamMembers(teamId: number) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.storingService.currentUserTokenPublic(),
    });
    return this.http
      .get(this.apiGetTeamMembers + teamId, { headers: headers })
      .pipe(
        tap((res: any) => {
          if (res.statusCode !== 200) {
            throw new Error(res.message ?? 'Failed to get team members');
          }
        })
      );
  }
}
