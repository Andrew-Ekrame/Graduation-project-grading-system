import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import {
  apiGetAllAppointmentYears,
  apiSetActiveYear,
} from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SetActiveYearService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiSetActiveYear = apiSetActiveYear;
  private apiGetAllAppointmentYears = apiGetAllAppointmentYears;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
  });
  getActiveYears() {
    return this.http
      .get(this.apiGetAllAppointmentYears, {
        headers: this.headers,
      })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to get years");
          }
        })
      );
  }

  setActiveYear(yearId: number) {
    return this.http
      .put(`${this.apiSetActiveYear}${yearId}`, { headers: this.headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to set active year");
          }
        })
      );
  }
}
