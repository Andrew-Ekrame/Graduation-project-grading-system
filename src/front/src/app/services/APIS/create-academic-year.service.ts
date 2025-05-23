import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { apiCreateNewAppointment } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateAcademicYearService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiCreateAcademicYear = apiCreateNewAppointment;
  createAcademicYear(data: {
    year: String;
    firstTerm: String;
    secondTerm: String;
    firstTermEnd: String;
    secondTermEnd: String;
  }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .post(this.apiCreateAcademicYear, data, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(
              resData.message ?? 'Failed to create academic year'
            );
          }
        })
      );
  }
}
