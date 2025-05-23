import { Component, DestroyRef, inject, input, output } from '@angular/core';
import { TeamInvitation } from '../../../services/models/invite.model';
import { ReviewInvitesService } from '../../../services/APIS/review-invites.service';
import { Router } from '@angular/router';
import { UserObjectModel } from '../../../services/models/user-object.model';
import { StoringUserService } from '../../../services/auth/storing-user.service';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-invite-card',
  imports: [],
  templateUrl: './invite-card.component.html',
  styleUrl: './invite-card.component.css',
})
export class InviteCardComponent {
  invite = input.required<TeamInvitation>();
  //api
  private reviewInviteService = inject(ReviewInvitesService);
  private router = inject(Router);
  private storingService = inject(StoringUserService);
  private destroyRef = inject(DestroyRef);
  private loginService = inject(LoginService);
  removeInvite = output<number>();
  get teamMembers() {
    return this.invite().teamMembers;
  }
  respondToInvite(response: boolean) {
    const subscription = this.reviewInviteService
      .reviewInvite(this.invite().invitationId, response)
      .subscribe({
        next: (res) => {
          if (response) {
            this.getUserProfile();
          } else {
            this.removeInvite.emit(this.invite().invitationId);
          }
        },
        error: (error) => {
          // console.log(error.error.message);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  private getUserProfile() {
    const subscription = this.loginService.userProfile().subscribe({
      next: (res) => {
        const resData = res as UserObjectModel;
        // console.log(resData);
        this.storingService.saveProfile(resData.data);
        this.router.navigate([
          `/home/team-hub/${
            this.storingService.currentUserProfilePublic()?.teamId
          }`,
        ]);
      },
      error: (err) => {
        // console.log(err.error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
