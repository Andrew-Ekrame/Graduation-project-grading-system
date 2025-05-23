import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  apiAllTeamsForAdminEvaluation,
  apiSubmitGrades,
} from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetTeamsAdminGradingService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
  });
  private apiGetTeamsForAdminGrading = apiAllTeamsForAdminEvaluation;
  private apiSubmitTeamGradesForAdmin = apiSubmitGrades;
  getTeams() {
    return this.http
      .get(this.apiGetTeamsForAdminGrading, {
        headers: this.headers,
      })
      .pipe(
        tap((res: any) => {
          if (res.statusCode !== 200) {
            throw new Error(res.message??"Failed to get teams");
          }
        })
      );
  }
  submitTeamGrades(data: {
    scheduleId: number;
    teamId: number;
    grades: { criteriaId: number; grade: number }[];
  }) {
    return this.http
      .post(this.apiSubmitTeamGradesForAdmin, data, {
        headers: this.headers,
      })
      .pipe(
        tap((res: any) => {
          if (res.statusCode !== 200) {
            throw new Error(res.message??"Failed to submit grades");
          }
        })
      );
  }
}
