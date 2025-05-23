import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiGetAllCriteria } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllCriteriaService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);

  getAllCriteria() {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http.get(apiGetAllCriteria, { headers: headers }).pipe(
      tap((resData) => {
        const res = resData as any;
        if (res.statusCode !== 200)
          throw new Error(res.message ?? 'Failed to get criteria');
      })
    );
  }
}
