import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';
import { apiUpdateCriteria } from '../api-exports.model.';

@Injectable({
  providedIn: 'root',
})
export class UpdateCriteriaService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiUpdateCriteria = apiUpdateCriteria;
  updateCriteria(data: {
    id: number;
    name: string;
    description: string;
    maxGrade: number;
    evaluator: 'Examiner' | 'Supervisor' | 'Admin';
    givenTo: 'Team' | 'Student';
    specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS';
    term: 'First-Term' | 'Second-Term';
  }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .put(this.apiUpdateCriteria, data, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to update criteria");
          }
        })
      );
  }
}
