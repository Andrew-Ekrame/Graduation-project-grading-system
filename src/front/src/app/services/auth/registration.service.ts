import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { apiOTPVerification, apiRegisterStudent } from '../api-exports.model.';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private http = inject(HttpClient);
  constructor() {}
  register(form: FormData) {
    return this.http.post(apiRegisterStudent, form);
  }
  sendOTP(otp: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(apiOTPVerification+otp, { headers: headers });
  }
}
