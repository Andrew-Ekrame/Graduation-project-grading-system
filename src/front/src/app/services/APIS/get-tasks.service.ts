import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiGetTeamTasks } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetTasksService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiGetTasks = apiGetTeamTasks;

  getTasks(teamId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.get(this.apiGetTasks + teamId, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to get tasks");
        }
      })
    );
  }
}
