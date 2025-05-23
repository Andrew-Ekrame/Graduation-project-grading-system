import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  ResetPasswordReq,
  ResetPasswordRes,
} from '../models/reset-password.model';
import { apiResetPass } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private http = inject(HttpClient);
  constructor() {}
  resetPassword(body: ResetPasswordReq) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(apiResetPass, body, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as ResetPasswordRes;
        if (resData.statusCode !== 200) {
          // console.log(resData.message);
          throw new Error(resData.message??"Failed to reset password");
        }
      })
    );
  }
}
