import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiAddCriteria } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddCriteriaService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  createCriteria(data: {
    name: string;
    description: string;
    maxGrade: number;
    evaluator: 'Examiner' | 'Supervisor' | 'Admin';
    givenTo: 'Team' | 'Student';
    specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS';
    term: 'First-Term' | 'Second-Term';
  }) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(apiAddCriteria, data, { headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          // console.log(resData.message);
          throw new Error(resData.message ?? 'Failed to add criteria');
        }
      })
    );
  }
}
