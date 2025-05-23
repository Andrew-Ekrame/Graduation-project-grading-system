import { inject, Injectable } from '@angular/core';
import {
  apiGetAccProjectsForDoctor,
  apiGetPendingTeamRequestsForDoctorProjectIdeas,
  apiReviewTeamProjectRequest,
} from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetProjectsRequestsService {
  private apiGetDoctorProjects = apiGetAccProjectsForDoctor;
  private apiGetRequests = apiGetPendingTeamRequestsForDoctorProjectIdeas;
  private apiReviewTeamProjectRequest = apiReviewTeamProjectRequest;
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  getRequests() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(
        this.apiGetRequests +
          this.storingService.currentUserProfilePublic()?.id,
        { headers: headers }
      )
      .pipe(
        tap((resData) => {
          const res = resData as any;
          if (res.statusCode !== 200)
            throw new Error(res.message ?? 'Failed to get requests');
        })
      );
  }

  getDoctorProjects() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(
        this.apiGetDoctorProjects +
          this.storingService.currentUserProfilePublic()?.id,
        { headers: headers }
      )
      .pipe(
        tap((resData) => {
          const res = resData as any;
          if (res.statusCode !== 200)
            throw new Error(res.message ?? 'Failed to get projects');
        })
      );
  }

  acceptProjectRequest(requestId: number, newStatus: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
      'content-type': 'application/json',
    });
    const body = {
      requestId: requestId,
      newStatus: newStatus,
      doctorId: this.storingService.currentUserProfilePublic()?.id,
    };
    return this.http
      .put(this.apiReviewTeamProjectRequest, body, { headers: headers })
      .pipe(
        tap((resData) => {
          const res = resData as any;
          if (res.statusCode !== 200)
            throw new Error(res.message ?? 'Failed to accept project request');
        })
      );
  }
}
