import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { RequestCardComponent } from './request-card/request-card.component';
import { AcceptedProject } from '../../../services/models/get-accepted-project.model';
import { GetProjectsRequestsService } from '../../../services/APIS/get-projects-requests.service';
import { PendingTeamRequest } from '../../../services/models/requests.model';

@Component({
  selector: 'app-project-requests-list',
  imports: [RequestCardComponent],
  templateUrl: './project-requests-list.component.html',
  styleUrl: './project-requests-list.component.css',
  host: {
    class: 'project-requests',
  },
})
export class ProjectRequestsListComponent {
  project = input.required<AcceptedProject>();
  requests = input.required<PendingTeamRequest[]>();
  popup = output<{
    status: boolean;
    message: string;
    action: 'Reject' | 'Accept';
    request: PendingTeamRequest;
  }>();
  private requestsService = inject(GetProjectsRequestsService);
  private destroyRef = inject(DestroyRef);
  reviewRequest(selected: {
    status: string;
    action: 'Accept' | 'Reject';
    request: PendingTeamRequest;
  }) {
    const subscription = this.requestsService
      .acceptProjectRequest(selected.request.requestId, selected.status)
      .subscribe({
        next: (resData) => {
          const res = resData as { statusCode: number; message: string };
          this.popup.emit({
            status: true,
            message: res.message,
            action: selected.action,
            request: selected.request,
          });
        },
        error: (err) => {
          // console.log(err.error.message);
          this.popup.emit({
            status: false,
            message: err.error.message,
            action: selected.action,
            request: selected.request,
          });
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
