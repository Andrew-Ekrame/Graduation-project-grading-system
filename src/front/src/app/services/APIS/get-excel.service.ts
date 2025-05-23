import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { apiGetExcel } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetExcelService {
  private storingService = inject(StoringUserService);
  private http = inject(HttpClient);
  private apiGetExcelSheet = apiGetExcel;

  getExcelSheet(specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS') {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    });
    return this.http
      .get(this.apiGetExcelSheet + specialty, {
        headers: headers,
      })
      .pipe(
        tap((resData) => {
          const res = resData as any;
          if (res.statusCode !== 200)
            throw new Error(
              res.message ?? `Failed to get excel sheet for ${specialty}`
            );
        })
      );
  }
}
