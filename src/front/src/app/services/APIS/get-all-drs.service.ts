import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiGetAllDoctors } from '../api-exports.model.';
import { Observable, tap } from 'rxjs';
import { DoctorsResponse } from '../models/get-allDoctors.model';

@Injectable({
  providedIn: 'root',
})
export class GetAllDrsService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiGet = apiGetAllDoctors;

  getAllDoctors(): Observable<DoctorsResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });

    return this.http.get<DoctorsResponse>(this.apiGet, { headers }).pipe(
      tap((res) => {
        if (res.statusCode !== 200) {
          throw new Error(res.message ?? 'Failed to get doctors');
        }
      })
    );
  }
}
