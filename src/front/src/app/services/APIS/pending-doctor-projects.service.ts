import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import {
  apiGetPendingDoctorProjects,
  apiDrProjectUpdate,
} from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PendingDoctorProjectsService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiGetPendingDrProjects = apiGetPendingDoctorProjects;
  private apiUpdatePendingDrProject = apiDrProjectUpdate;

  getProjects() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.get(this.apiGetPendingDrProjects, { headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message ?? 'Failed to get projects');
        }
      })
    );
  }

  updatePendingProject(projectId: number, newStatus: 'Accepted' | 'Rejected') {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const body = {
      projectId: projectId,
      newStatus: newStatus,
    };
    return this.http
      .put(this.apiUpdatePendingDrProject, body, { headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(
              resData.message ?? 'Failed to update project status'
            );
          }
        })
      );
  }
}
