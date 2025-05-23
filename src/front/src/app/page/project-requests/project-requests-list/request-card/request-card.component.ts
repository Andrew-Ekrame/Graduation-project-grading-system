import { Component, input, output } from '@angular/core';
import { PendingTeamRequest } from '../../../../services/models/requests.model';

@Component({
  selector: 'app-request-card',
  imports: [],
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.css',
})
export class RequestCardComponent {
  request = input.required<PendingTeamRequest>();
  teamSelected = output<{
    status: string;
    action: 'Accept' | 'Reject';
    request: PendingTeamRequest;
  }>();
  acceptRequest() {
    this.teamSelected.emit({
      status: 'Accepted',
      action: 'Accept',
      request: this.request(),
    });
  }
  rejectRequest() {
    this.teamSelected.emit({
      status: 'Rejected',
      action: 'Reject',
      request: this.request(),
    });
  }

  get members() {
    return this.request().teamMembers;
  }
}
