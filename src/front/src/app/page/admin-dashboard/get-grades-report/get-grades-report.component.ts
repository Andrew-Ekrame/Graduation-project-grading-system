import { Component, DestroyRef, inject, signal } from '@angular/core';
import { GetExcelService } from '../../../services/APIS/get-excel.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ExcelResponse } from '../../../services/models/excel.model';

@Component({
  selector: 'app-get-grades-report',
  imports: [ReactiveFormsModule],
  templateUrl: './get-grades-report.component.html',
  styleUrl: './get-grades-report.component.css',
})
export class GetGradesReportComponent {
  private destroyRef = inject(DestroyRef);
  private getExcelService = inject(GetExcelService);
  form = new FormGroup({
    specialty: new FormControl<'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS'>(
      'CS',
      {
        validators: [Validators.required],
      }
    ),
  });

  private sanitizer = inject(DomSanitizer);
  url = signal<SafeUrl | null>(null);
  showDownload = signal<boolean>(false);
  displayedText = signal<string>('');
  fileName = signal<string>('');
  onSubmit() {
    if (!this.form.valid) return;
    else {
      const subscription = this.getExcelService
        .getExcelSheet(this.form.value.specialty!)
        .subscribe({
          next: (res) => {
            const resData = res as ExcelResponse;
            const base64FileContent = resData.data.excelSheet.fileContent;
            this.fileName.set(resData.data.excelSheet.fileName);
            // Decode base64 string to binary
            const byteArray = this.base64ToArrayBuffer(base64FileContent);

            // Create a Blob and URL
            const blob = new Blob([byteArray], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const blobUrl = URL.createObjectURL(blob);
            const safeUrl = this.sanitizer.bypassSecurityTrustUrl(blobUrl);

            this.url.set(safeUrl);
            this.displayedText.set('');
            this.showDownload.set(true);
          },
          error: (err) => {
            // console.log(err.error.message);
            this.showDownload.set(false);
            this.url.set(null);
            this.displayedText.set(err.error.message ?? '');
          },
        });

      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  // Decode a base64 string to an ArrayBuffer
  private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64); // Decode base64 to binary string
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  //for memory management (remove file from memory after download)
  revokeUrl() {
    const safe = this.url();
    if (!safe) return;

    //extract original blob URL from SafeUrl wrapper
    const unsafeUrl = (safe as any)['changingThisBreaksApplicationSecurity'];
    if (unsafeUrl) {
      URL.revokeObjectURL(unsafeUrl);
    }

    this.url.set(null);
    this.showDownload.set(false);
  }
}
