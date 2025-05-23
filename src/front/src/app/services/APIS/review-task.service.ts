import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiReviewTask } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewTaskService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiReviewTask = apiReviewTask;

  reviewTask(taskId: number, studentId: number) {
    const url = `${this.apiReviewTask}${taskId}/${studentId}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.put(url, {}, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to review task");
        }
      })
    );
  }
}
