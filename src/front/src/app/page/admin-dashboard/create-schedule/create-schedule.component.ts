import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TeamForSchedule,
  TeamsForScheduleResponse,
} from '../../../services/models/create-schedule.model';
import { TeamScheduleFormComponent } from './team-schedule-form/team-schedule-form.component';
import { CreateScheduleService } from '../../../services/APIS/create-schedule.service';
import { GetAllDrsService } from '../../../services/APIS/get-all-drs.service';
import { Doctor } from '../../../services/models/get-allDoctors.model';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component';

@Component({
  imports: [
    ReactiveFormsModule,
    TeamScheduleFormComponent,
    PopupStatusMessageComponent,
  ],
  selector: 'app-create-schedule',
  standalone: true,
  templateUrl: './create-schedule.component.html',
  styleUrl: './create-schedule.component.css',
})
export class CreateScheduleComponent implements OnInit {
  loading = computed(() => this.loadingExaminers() || this.loadingTeams());
  success = computed(() => this.successExaminers() && this.successTeams());
  loadingExaminers = signal<boolean>(true);
  loadingTeams = signal<boolean>(true);
  successTeams = signal<boolean>(false);
  successExaminers = signal<boolean>(false);
  displayedText = signal<string>('Loading projects and doctors...');
  teamsData = signal<TeamForSchedule[]>([]);
  private destroyRef = inject(DestroyRef);
  private createScheduleService = inject(CreateScheduleService);
  private getAllDoctors = inject(GetAllDrsService);
  examinersList = signal<Doctor[]>([]);
  ngOnInit() {
    this.getTeamsWithProjects();
    this.getExaminers();
  }

  //get teams
  getTeamsWithProjects() {
    const subscription = this.createScheduleService
      .getTeamsWithProjects()
      .subscribe({
        next: (response) => {
          const resData = response as TeamsForScheduleResponse;
          this.teamsData.set(resData.data.teams);
          this.loadingTeams.set(false);
          this.successTeams.set(true);
        },
        error: (error) => {
          this.loadingTeams.set(false);
          this.successTeams.set(false);
          this.displayedText.set(error.error.message ?? 'Failed to load teams');
          // console.error(error);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  getExaminers() {
    const subscription = this.getAllDoctors.getAllDoctors().subscribe({
      next: (res) => {
        this.examinersList.set(res.data.doctorsList);
        this.loadingExaminers.set(false);
        this.successExaminers.set(true);
      },
      error: (err) => {
        // console.error('Doctors loading error:', err);
        this.loadingExaminers.set(false);
        this.successExaminers.set(false);
        this.displayedText.set(err.error.message ?? 'Failed to load teams');
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  createSchedule(data: { teamId: number; date: string; examiners: number[] }) {
    const subscription = this.createScheduleService
      .createSchedule(data)
      .subscribe({
        next: (res) => {
          const resData = res as any;
          this.showPopupMessage(
            resData.message ?? 'Schedule created successfully',
            true
          );
          this.teamsData.update((teams) =>
            teams.filter((t) => t.id !== data.teamId)
          );
        },
        error: (err) => {
          // console.log(err);
          this.showPopupMessage(
            err.error.message ?? 'Failed to create schedule',
            false
          );
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  //popup
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
