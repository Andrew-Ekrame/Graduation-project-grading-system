import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiGetMyCriteria, apiGetMyGrades } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetMyGradesService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiGetMyCriteria = apiGetMyCriteria;
  private apiGetMyGrades = apiGetMyGrades;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
  });
  getMyGrades() {
    return this.http.get(this.apiGetMyGrades, { headers: this.headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message ?? 'Failed to get grades');
        }
      })
    );
  }
  getMyCriteria() {
    return this.http.get(this.apiGetMyCriteria, { headers: this.headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message ?? 'Failed to get grading criteria');
        }
      })
    );
  }
}
