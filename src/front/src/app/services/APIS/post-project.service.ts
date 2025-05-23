import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  apiPostProjectDoctor,
  apiPostProjectTeam,
} from '../api-exports.model.';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';
import {
  PostProjectReq,
  PostProjectTeamReq,
} from '../models/post-project.model';

@Injectable({
  providedIn: 'root',
})
export class PostProjectService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  post(body: PostProjectReq | PostProjectTeamReq) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    let api: string = '';
    if (this.storingService.currentUserProfilePublic()?.role === 'Doctor') {
      api = apiPostProjectDoctor;
    } else if (
      this.storingService.currentUserProfilePublic()?.role === 'Student' &&
      this.storingService.currentUserProfilePublic()?.leaderOfTeamId
    ) {
      api = apiPostProjectTeam;
    }
    return this.http.post(api, body, { headers: headers }).pipe(
      tap((res: any) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message ?? 'Failed to post project');
        }
      })
    );
  }
}
