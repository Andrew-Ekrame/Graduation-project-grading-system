import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiResendOtp } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResendOtpService {
  private http = inject(HttpClient);
  private apiResendOpt = apiResendOtp;

  resendOtp(email: string) {
    return this.http.post(this.apiResendOpt + email, {}).pipe(
      tap((res: any) => {
        if (res.statusCode !== 200) {
          throw new Error(res.message??"Failed to resend OTP");
        }
      })
    );
  }
}
