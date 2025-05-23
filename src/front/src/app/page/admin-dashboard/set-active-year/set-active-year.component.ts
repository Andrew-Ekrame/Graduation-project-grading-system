import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  AcademicAppointmentResponse,
  AcademicYearAppointment,
} from '../../../services/models/academic-years.model';
import { SetActiveYearService } from '../../../services/APIS/set-active-year.service';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-set-active-year',
  templateUrl: './set-active-year.component.html',
  styleUrls: ['./set-active-year.component.css'],
  imports: [PopupStatusMessageComponent, NgClass, DatePipe],
})
export class SetActiveYearComponent implements OnInit {
  academicYears = signal<AcademicYearAppointment[]>([]);
  private setActiveYearService = inject(SetActiveYearService);
  private destroyRef = inject(DestroyRef);
  loading = signal<boolean>(true);
  success = signal<boolean>(false);
  displayedText = signal<string>('Loading academic years...');
  ngOnInit(): void {
    //getting years
    const subscription = this.setActiveYearService.getActiveYears().subscribe({
      next: (res) => {
        const resData = res as AcademicAppointmentResponse;
        this.academicYears.set(resData.data.academicYearAppointments);
        this.loading.set(false);
        this.success.set(true);
        this.displayedText.set('');
      },
      error: (err) => {
        // console.log(err.error.message ?? 'Failed to get academic years');
        this.loading.set(false);
        this.success.set(false);
        this.displayedText.set(
          err.error.message ?? 'Failed to get academic years'
        );
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  setActiveYear(year: AcademicYearAppointment) {
    const subscription = this.setActiveYearService
      .setActiveYear(year.id)
      .subscribe({
        next: (res) => {
          const resData = res as any;
          this.academicYears.update((old) =>
            old.map((y) => {
              if (y.id === year.id) {
                y.status = 'Active';
              }
              return y;
            })
          );
          this.showPopupMessage(resData.message, true);
        },
        error: (err) => {
          this.showPopupMessage(
            err.error.message ?? 'Failed to set active year',
            false
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //popup methods
  showPopup = signal<boolean>(false);
  message = signal<string>('');
  status = signal<boolean>(false);
  showPopupMessage(message: string, status: boolean) {
    this.showPopup.set(true);
    this.message.set(message);
    this.status.set(status);
  }
  closePopup() {
    this.showPopup.set(false);
    this.message.set('');
    this.status.set(false);
  }
}
