import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiForgetPass } from '../api-exports.model.';
import { tap } from 'rxjs';
import { ResetPasswordRes } from '../models/reset-password.model';

@Injectable({
  providedIn: 'root',
})
export class ForgetPasswordService {
  private http = inject(HttpClient);
  constructor() {}
  forgetPassword(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(apiForgetPass, { email }, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as ResetPasswordRes;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message??"Failed to reset password");
        }
      })
    );
  }
}
