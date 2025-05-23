import { inject, Injectable } from '@angular/core';
import {
  apiGetAllTeamsWithProjects,
  apiCreateSchedule,
} from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CreateScheduleService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);

  getTeamsWithProjects() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(apiGetAllTeamsWithProjects, {
        headers: headers,
      })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(
              resData.message ?? 'Failed to get teams with projects'
            );
          }
        })
      );
  }
  createSchedule(data: { teamId: number; date: string; examiners: number[] }) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
      'Content-Type': 'application/json',
    });

    const body = {
      teamId: data.teamId,
      scheduleDate: data.date,
      // committeeDoctorIds: {} as { [key: string]: number },
      committeeDoctorIds: data.examiners,
    };

    // Add examiner IDs with indices
    // data.examiners.forEach((id, index) => {
    //   body.committeeDoctorIds[`[${index}]`] = id;
    // });

    return this.http.post(apiCreateSchedule, body, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message ?? 'Failed to create schedule');
        }
      })
    );
  }
}
