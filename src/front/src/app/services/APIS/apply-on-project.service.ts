import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiApplyOnDoctorProject } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplyOnProjectService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiApplyOnProject = apiApplyOnDoctorProject;

  applyOnProject(doctorId: number, projectId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const body = {
      doctorId: doctorId,
      projectId: projectId,
      teamLeaderId:
        this.storingService.currentUserProfilePublic()?.leaderOfTeamId,
      teamId: this.storingService.currentUserProfilePublic()?.teamId,
    };
    return this.http
      .post(this.apiApplyOnProject, body, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to apply on project");
          }
        })
      );
  }
}
