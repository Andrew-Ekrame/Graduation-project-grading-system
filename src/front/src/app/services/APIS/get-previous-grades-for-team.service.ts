import { inject, Injectable } from '@angular/core';
import { apiTeamEvaluations } from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetPreviousGradesForTeamService {
  private apiGetPreviousGradesForTeam = apiTeamEvaluations;
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);

  getPreviousGradesForTeam(teamId: number, scheduleId: number) {
    const apiUrl = this.apiGetPreviousGradesForTeam + teamId + '/' + scheduleId;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(apiUrl, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to get previous grades for team");
        }
      })
    );
  }
}
