import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ProjectRequestsListComponent } from './project-requests-list/project-requests-list.component';
import { GetProjectsRequestsService } from '../../services/APIS/get-projects-requests.service';
import {
  PendingTeamRequest,
  Requests,
} from '../../services/models/requests.model';
import { PopupStatusMessageComponent } from '../../shared/popup-status-message/popup-status-message.component';
import {
  AcceptedProjectForRequest,
  AcceptedProjectsForRequestRes,
} from '../../services/models/projects-for-requests.model';

@Component({
  selector: 'app-project-requests',
  imports: [ProjectRequestsListComponent, PopupStatusMessageComponent],
  templateUrl: './project-requests.component.html',
  styleUrl: './project-requests.component.css',
  host: {
    class: 'requests-list',
  },
})
export class ProjectRequestsComponent implements OnInit {
  private requestsService = inject(GetProjectsRequestsService);
  private destroyRef = inject(DestroyRef);
  projects = signal<AcceptedProjectForRequest[]>([]);
  requests = signal<PendingTeamRequest[]>([]);
  LoadingP = signal<boolean>(true);
  LoadingR = signal<boolean>(true);
  successP = signal<boolean>(false);
  successR = signal<boolean>(false);
  displayedText = signal<string>('Loading...');
  popup = signal<boolean>(false);
  popupData = signal<{
    status: boolean;
    message: string;
    projectId: number;
  }>({ status: false, message: '', projectId: -1 });
  ngOnInit() {
    //getting projects
    const projects = this.requestsService.getDoctorProjects().subscribe({
      next: (resData) => {
        const res = resData as AcceptedProjectsForRequestRes;
        if (res.data.acceptedProjectIdeasForDoctor.length === 0) {
          this.displayedText.set('No requests found');
          this.LoadingP.set(false);
          this.successP.set(false);
          return;
        }
        this.LoadingP.set(false);
        this.successP.set(true);
        this.displayedText.set('');
        this.projects.set(res.data.acceptedProjectIdeasForDoctor);
      },
      error: (err) => {
        this.LoadingP.set(false);
        this.successP.set(false);
        this.displayedText.set(err.error.message);
      },
    });

    //getting requests
    const requests = this.requestsService.getRequests().subscribe({
      next: (resData) => {
        const res = resData as Requests;
        if (res.data.pendingTeamRequests.length === 0) {
          this.displayedText.set('No requests found');
          this.LoadingR.set(false);
          this.successR.set(false);
          return;
        }
        this.LoadingR.set(false);
        this.successR.set(true);
        this.displayedText.set('');
        this.requests.set(res.data.pendingTeamRequests);
      },
      error: (err) => {
        this.LoadingR.set(false);
        this.successR.set(false);
        this.displayedText.set(err.error.message);
      },
    });

    //destroying subscriptions
    this.destroyRef.onDestroy(() => {
      projects.unsubscribe();
      requests.unsubscribe();
    });
  }
  requestsForProject(projectId: number) {
    return this.requests().filter(
      (request) => request.doctorProjectIdeaId === projectId
    );
  }
  openPopup(data: {
    status: boolean;
    message: string;
    request: PendingTeamRequest;
    action: 'Accept' | 'Reject';
  }) {
    this.popupData.set({
      status: data.status,
      message: data.message,
      projectId: data.request.doctorProjectIdeaId,
    });
    this.popup.set(true);
    if (data.status) {
      if (data.action === 'Accept') {
        this.projects.update((old) =>
          old.filter(
            (project) => project.id !== data.request.doctorProjectIdeaId
          )
        );
        this.requests.update((old) =>
          old.filter((request) => request.teamId !== data.request.teamId)
        );
      } else if (data.action === 'Reject') {
        this.requests.update((old) =>
          old.filter((request) => request.requestId !== data.request.requestId)
        );
      }
    }
  }

  hidePopup() {
    this.popup.set(false);
  }
}
