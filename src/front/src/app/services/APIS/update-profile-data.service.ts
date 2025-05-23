import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  apiChangeUsername,
  apiChangeProfilePicture,
  apiChangePassword,
} from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateProfileDataService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiUpdateName = apiChangeUsername;
  private apiUpdatePhoto = apiChangeProfilePicture;
  private apiUpdatePassword = apiChangePassword;

  updateName(name: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const body = {
      newUsername: name,
    };
    return this.http.put(this.apiUpdateName, body, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message ?? 'Failed to change username');
        }
      })
    );
  }
  updatePhoto(photo: FormData) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    // console.log(photo);
    return this.http.put(this.apiUpdatePhoto, photo, { headers: headers }).pipe(
      tap((res) => {
        const resData = res as any;
        if (resData.statusCode !== 200) {
          throw new Error(resData.message ?? 'Failed to change photo');
        }
      })
    );
  }
  updatePassword(oldPassword: string, newPassword: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    const body = {
      oldPassword,
      newPassword,
    };
    return this.http
      .put(this.apiUpdatePassword, body, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message ?? 'Failed to change password');
          }
        })
      );
  }
}
