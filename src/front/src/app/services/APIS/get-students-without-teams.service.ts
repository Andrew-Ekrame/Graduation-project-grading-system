import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';
import { apiGetStudentsWithoutTeams } from '../api-exports.model.';

@Injectable({
  providedIn: 'root',
})
export class GetStudentsWithoutTeamsService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  getStudentsWithoutTeams() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.get(apiGetStudentsWithoutTeams, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to get students without teams");
        }
      })
    );
  }
}
