import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiGetUserProfile, apiLogin } from '../api-exports.model.';
import { LoginInput } from '../models/login-input.model';
import { map, Observable, tap } from 'rxjs';
import { LoginApiSuccess } from '../models/login-api-success.model';
import { StoringUserService } from './storing-user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private storeService = inject(StoringUserService);
  constructor() {}
  login(input: LoginInput): Observable<LoginApiSuccess> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(apiLogin, input, { headers: headers }).pipe(
      tap((res: any) => {
        if (res.statusCode !== 200) {
          throw new Error(res.message??"Failed to login");
        }
      })
    );
  }
  userProfile() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-User-Timezone': timezone,
      Authorization: `Bearer ${this.storeService.currentUserTokenPublic()}`,
    });
    return this.http.get(apiGetUserProfile, { headers: headers }).pipe(
      tap((resData) => {
        const res = resData as any;
        if (res.statusCode !== 200) {
          throw new Error(res.message??"Failed to get user profile");
        }
      })
    );
  }
}
