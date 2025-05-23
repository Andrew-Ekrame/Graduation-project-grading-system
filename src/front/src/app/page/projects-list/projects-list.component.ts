import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectInfoOverlayComponent } from './project-info-overlay/project-info-overlay.component';
import { GetAcceptedProjectService } from '../../services/APIS/get-accepted-project.service';
import {
  AcceptedProject,
  AcceptedProjectsRes,
  Projects,
} from '../../services/models/get-accepted-project.model';
import { PopupStatusMessageComponent } from '../../shared/popup-status-message/popup-status-message.component';

@Component({
  selector: 'app-projects-list',
  imports: [
    ProjectCardComponent,
    ProjectInfoOverlayComponent,
    PopupStatusMessageComponent,
  ],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css'],
  standalone: true,
})
export class ProjectsListComponent implements OnInit {
  showOverlay: boolean = false;
  loading = signal<boolean>(true);
  displayedText = signal<string>('Loading available projects');
  private getProjectService = inject(GetAcceptedProjectService);
  private destroyRef = inject(DestroyRef);
  noProjectsError = false;
  private acceptedProjects = signal<AcceptedProject[]>([]);
  acceptedProjectsPublic = this.acceptedProjects.asReadonly();
  selectedProject = signal<AcceptedProject | null>(null);

  ngOnInit() {
    const subscription = this.getProjectService
      .getAcceptedProjects()
      .subscribe({
        next: (res) => {
          const resData = res as AcceptedProjectsRes;
          // Initialize with empty array first
          this.acceptedProjects.set([]);

          if (
            !resData.data.acceptedDoctorProjects ||
            resData.data.acceptedDoctorProjects.length === 0
          ) {
            this.displayedText.set(
              'No projects are currently posted , Please check again later'
            );
            this.noProjectsError = true;
          } else {
            this.noProjectsError = false;
            // Set the data only if it's valid
            this.acceptedProjects.set(resData.data.acceptedDoctorProjects);
          }
          this.loading.set(false);
        },
        error: (err) => {
          // console.error(err.message);
          this.noProjectsError = true;
          this.displayedText.set(err.error.message ?? 'Error loading projects');
          this.acceptedProjects.set([]);
          this.loading.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  toggleOverlay(value: { value: boolean; id: number }) {
    this.showOverlay = value.value;
    this.selectedProject.set(
      this.acceptedProjectsPublic().find((project) => project.id === value.id)!
    );
  }
  toggleOverlayFalse(value: boolean) {
    this.showOverlay = value;
  }

  openPopup = signal<boolean>(false);
  status = signal<boolean>(false);
  message = signal<string>('');
  closePopup() {
    this.openPopup.set(false);
    this.message.set('');
    this.status.set(false);
  }
  showPopup(data: { message: string; status: boolean }) {
    this.message.set(data.message);
    this.status.set(data.status);
    this.openPopup.set(true);
  }
}
