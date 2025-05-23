import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import {
  apiGetAllDoctorSchedules,
  apiGetAllStudentSchedules,
} from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetMySchedulesService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiDoctorSchedules = apiGetAllDoctorSchedules;
  private apiStudentSchedule = apiGetAllStudentSchedules;
  getMySchedules() {
    let api: string = '';
    if (this.storingService.currentUserProfilePublic()?.role === 'Doctor') {
      api = this.apiDoctorSchedules;
    } else if (
      this.storingService.currentUserProfilePublic()?.role === 'Student'
    ) {
      api = this.apiStudentSchedule;
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(api, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to get schedules");
        }
      })
    );
  }
}
