import { inject, Injectable } from '@angular/core';
import { apiGetFinalProjectIdeas } from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FinalProjectsService {
  private apiGetFinalProjects = apiGetFinalProjectIdeas;
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  getProjectIdeas() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.get(this.apiGetFinalProjects, { headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to get project ideas");
        }
      })
    );
  }
}
