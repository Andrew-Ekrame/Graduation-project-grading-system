import { inject, Injectable } from '@angular/core';
import { apiGetTeamsForDoctor } from '../api-exports.model.';
import { StoringUserService } from '../auth/storing-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetDoctorTeamsService {
  private apiGetTeamsForDoctor = apiGetTeamsForDoctor;
  private storingService = inject(StoringUserService);
  private http = inject(HttpClient);
  constructor() {}
  getTeamsForDoctor() {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(this.apiGetTeamsForDoctor, { headers: header }).pipe(
      tap((resData) => {
        const res = resData as any;
        if (res.statusCode !== 200) throw new Error(res.message?? 'Failed to get teams');
      })
    );
  }
}
