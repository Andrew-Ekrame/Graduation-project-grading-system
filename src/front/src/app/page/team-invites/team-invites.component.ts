import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { InviteCardComponent } from './invite-card/invite-card.component';
import { GetInvitesService } from '../../services/APIS/get-invites.service';
import {
  InvitationsResponse,
  TeamInvitation,
} from '../../services/models/invite.model';

@Component({
  selector: 'app-team-invites',
  imports: [InviteCardComponent],
  templateUrl: './team-invites.component.html',
  styleUrl: './team-invites.component.css',
})
export class TeamInvitesComponent implements OnInit {
  private getInvitesService = inject(GetInvitesService);
  private destroyRef = inject(DestroyRef);
  invites = signal<TeamInvitation[]>([]);
  isLoading = signal<boolean>(true);
  success = signal<boolean>(true);
  displayedText = signal<string>('Loading invites...');
  ngOnInit() {
    const subscription = this.getInvitesService.getAllInvites().subscribe({
      next: (res) => {
        const resData = res as InvitationsResponse;
        this.invites.set(resData.data.invitations);
        this.isLoading.set(false);
        this.success.set(true);
      },
      error: (err) => {
        this.success.set(false);
        this.displayedText.set(err.error.message);
        this.isLoading.set(false);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  removeInvite(inviteId: number) {
    this.invites.update((old) => {
      return old.filter((invite) => invite.invitationId !== inviteId);
    });
  }
}
