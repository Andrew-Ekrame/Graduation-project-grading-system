import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiDeleteCriteria } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteCriteriaService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  deleteCriteria(criteriaId: number) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
      'Content-Type': 'application/json',
    });
    return this.http
      .delete(`${apiDeleteCriteria}${criteriaId}`, {
        headers: headers,
        body: {},
      })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message??"Failed to delete criteria");
          }
        })
      );
  }
}
