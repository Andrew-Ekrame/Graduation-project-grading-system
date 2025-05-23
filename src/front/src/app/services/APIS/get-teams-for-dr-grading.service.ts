import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import {
  apiAllTeamsForExaminationEvaluation,
  apiAllTeamsForSupervisionEvaluation,
  apiSubmitGradesByDoctor,
} from '../api-exports.model.';
import { tap } from 'rxjs';
import { Submission } from '../models/post-gradings-dr.model';

@Injectable({
  providedIn: 'root',
})
export class GetTeamsForDrGradingService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiGetTeamsForSupervisorGrading = apiAllTeamsForSupervisionEvaluation;
  private apiGetTeamsForExaminerGrading = apiAllTeamsForExaminationEvaluation;
  private apiPostGrading = apiSubmitGradesByDoctor;
  getTeamsForSupervisorGrading() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(this.apiGetTeamsForSupervisorGrading, { headers: headers })
      .pipe(
        tap((res: any) => {
          if (res.statusCode !== 200) {
            throw new Error(res.message??"Failed to get teams");
          }
        })
      );
  }
  getTeamsForExaminerGrading() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(this.apiGetTeamsForExaminerGrading, { headers: headers })
      .pipe(
        tap((res: any) => {
          if (res.statusCode !== 200) {
            throw new Error(res.message??"Failed to get teams");
          }
        })
      );
  }
  postGrading(data: Submission) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.post(this.apiPostGrading, data, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to post grading");
        }
      })
    );
  }
}
