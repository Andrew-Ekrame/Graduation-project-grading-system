import {
  Component,
  DestroyRef,
  inject,
  computed,
  signal,
  OnInit,
} from '@angular/core';
import { GetPendingProjectsFromTeamsService } from '../../../services/APIS/get-pending-projects-from-teams.service';
import {
  PendingProjectFromTeam,
  PendingProjectsFromTeamsResponse,
} from '../../../services/models/pending-projects-from-teams.model';
import { GetAllDrsService } from '../../../services/APIS/get-all-drs.service';
import { Doctor } from '../../../services/models/get-allDoctors.model';
import { PendingTeamCardComponent } from './pending-team-card/pending-team-card.component';
import { UpdateTeamIdeaService } from '../../../services/APIS/update-team-idea.service';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component';

@Component({
  selector: 'app-pending-projects-from-teams',
  imports: [PendingTeamCardComponent, PopupStatusMessageComponent],
  templateUrl: './pending-projects-from-teams.component.html',
  styleUrl: './pending-projects-from-teams.component.css',
})
export class PendingProjectsFromTeamsComponent implements OnInit {
  private getPendingProjectsService = inject(
    GetPendingProjectsFromTeamsService
  );
  private getAllDrsService = inject(GetAllDrsService);
  private destroyRef = inject(DestroyRef);
  private updateTeamIdeaService = inject(UpdateTeamIdeaService);

  pendingProjects = signal<PendingProjectFromTeam[]>([]);
  allDoctors = signal<Doctor[]>([]);

  isLoadingProjects = signal(true);
  isLoadingDoctors = signal(true);
  successProjects = signal(false);
  successDoctors = signal(false);
  displayedText = signal<string>('Loading projects and doctors...');

  // Computed signal for overall loading state
  isLoading = signal<boolean>(true);

  // Computed signal for overall success state
  success = computed(() => this.successProjects() && this.successDoctors());

  ngOnInit() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.loadPendingProjects();
    this.loadDoctors();

    this.isLoading.update(
      (old) => !this.isLoadingDoctors() && !this.isLoadingProjects()
    );
  }

  private loadPendingProjects(): void {
    const subscription = this.getPendingProjectsService
      .getPendingProjectsFromTeams()
      .subscribe({
        next: (res) => {
          const resData = res as PendingProjectsFromTeamsResponse;
          this.pendingProjects.set(resData.data.pendingTeamProjects);
          this.isLoadingProjects.update((old) => false);
          this.successProjects.update((old) => true);
        },
        error: (err) => {
          // console.error('Projects loading error:', err);
          this.displayedText.set(
            err.error.message ?? 'Failed to load projects'
          );
          this.isLoadingProjects.update((old) => false);
          this.successProjects.update((old) => false);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private loadDoctors(): void {
    const subscription = this.getAllDrsService.getAllDoctors().subscribe({
      next: (res) => {
        this.allDoctors.set(res.data.doctorsList);
        this.isLoadingDoctors.update((old) => false);
        this.successDoctors.update((old) => true);
      },
      error: (err) => {
        // console.error('Doctors loading error:', err);
        this.displayedText.set(err.error.message ?? 'Failed to load doctors');
        this.isLoadingDoctors.update((old) => false);
        this.successDoctors.update((old) => false);
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  reviewProject(data: {
    projectId: number;
    status: 'Accepted' | 'Rejected';
    doctorId: number;
  }) {
    const subscription = this.updateTeamIdeaService
      .updateTeamIdea(data)
      .subscribe({
        next: (res) => {
          this.openPopUp(`Project ${data.status} successfully`, true);
          this.pendingProjects.update((old) =>
            old.filter((p) => p.id !== data.projectId)
          );
        },
        error: (err) => {
          // console.log(err);
          this.openPopUp('Something went wrong! Please try again', false);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  //popup
  showPopup = signal<boolean>(false);
  status = signal<boolean>(false);
  message = signal<string>('');
  closePopup() {
    this.showPopup.set(false);
    this.status.set(false);
    this.message.set('');
  }

  openPopUp(message: string, status: boolean) {
    this.message.set(message);
    this.status.set(status);
    this.showPopup.set(true);
  }
}
