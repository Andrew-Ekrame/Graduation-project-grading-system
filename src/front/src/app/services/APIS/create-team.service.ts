import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiCreateTeam } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateTeamService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  createTeam(teamName: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const body = {
      teamName: teamName,
    };
    return this.http.post(apiCreateTeam, body, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          // console.log(resData.message);
          throw new Error(resData.message??"Failed to create team");
        }
      })
    );
  }
}
