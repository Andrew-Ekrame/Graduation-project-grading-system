import { inject, Injectable } from '@angular/core';
import { apiCreateDoctorAccount } from '../api-exports.model.';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StoringUserService } from '../auth/storing-user.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateDrAccountService {
  private apiCreateDrAccount = apiCreateDoctorAccount;
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);

  registerDoctor(fullName: string, email: string, password: string) {
    const body = {
      fullName,
      email,
      password,
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .post(this.apiCreateDrAccount, body, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(
              resData.message ?? 'Failed to create doctor account'
            );
          }
        })
      );
  }
}
