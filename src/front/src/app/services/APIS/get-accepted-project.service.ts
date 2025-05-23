import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiGetAccProjectsFromDrs } from '../api-exports.model.';
import { tap } from 'rxjs';
import { AcceptedProjectsRes } from '../models/get-accepted-project.model';
import { StoringUserService } from '../auth/storing-user.service';

@Injectable({
  providedIn: 'root',
})
export class GetAcceptedProjectService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  getAcceptedProjects() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.get(apiGetAccProjectsFromDrs, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as AcceptedProjectsRes;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to get accepted projects");
        }
      })
    );
  }
}
