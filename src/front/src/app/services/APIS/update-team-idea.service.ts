import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiTeamProjectUpdate } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateTeamIdeaService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiReviewTeamIdea = apiTeamProjectUpdate;

  updateTeamIdea(input: {
    projectId: number;
    status: 'Accepted' | 'Rejected';
    doctorId: number;
  }) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const body = {
      projectId: input.projectId,
      newStatus: input.status,
      supervisorId: input.doctorId,
    };
    return this.http
      .put(this.apiReviewTeamIdea, body, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to update team idea");
          }
        })
      );
  }
}
