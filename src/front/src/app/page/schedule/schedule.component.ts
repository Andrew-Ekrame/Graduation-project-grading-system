import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { StoringUserService } from '../../services/auth/storing-user.service';
import { ScheduleCardDrComponent } from './schedule-card-dr/schedule-card-dr.component';
import {
  AllSchedulesResponse,
  TeamScheduleData,
} from '../../services/models/schedule-details.model';
import { GetMySchedulesService } from '../../services/APIS/get-my-schedules.service';

@Component({
  selector: 'app-schedule',
  imports: [ScheduleCardDrComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent implements OnInit {
  storingUserService = inject(StoringUserService);
  private getSchedulesService = inject(GetMySchedulesService);
  private destroyRef = inject(DestroyRef);

  listOfSchedules = signal<TeamScheduleData[]>([]);

  displayedText = signal<string>('Loading...');
  loading = signal<boolean>(true);
  success = signal<boolean>(false);

  ngOnInit() {
    const subscription = this.getSchedulesService.getMySchedules().subscribe({
      next: (res) => {
        const resData = res as AllSchedulesResponse;
        this.listOfSchedules.set(resData.data.schedules);
        this.loading.set(false);
        this.success.set(true);
      },
      error: (err) => {
        this.displayedText.set(err.error.message ?? 'Failed to load schedules');
        this.loading.set(false);
        this.success.set(false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  role = computed<string | null>(() => {
    if (this.storingUserService.currentUserProfilePublic()?.role === 'Doctor') {
      return 'Doctor';
    } else if (
      this.storingUserService.currentUserProfilePublic()?.role === 'Student'
    ) {
      return 'Student';
    }
    return null;
  });
}
