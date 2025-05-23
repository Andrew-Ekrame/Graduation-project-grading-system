import { inject, Injectable } from '@angular/core';
import { apiGetFinalProjectIdea } from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';
import { ProjectResponse } from '../models/project-by-id.model';

@Injectable({
  providedIn: 'root',
})
export class GetProjectByIdService {
  private apiGetFinalProjectIdea = apiGetFinalProjectIdea;
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  getProjectById(teamId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(this.apiGetFinalProjectIdea + teamId, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as ProjectResponse;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to get project by ID");
          }
        })
      );
  }
}
