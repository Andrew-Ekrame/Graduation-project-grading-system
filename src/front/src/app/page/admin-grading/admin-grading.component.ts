import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  AdminTeamsResponse,
  CriteriaAdmin,
  TeamAdmin,
} from '../../services/models/teams-for-evaluation-by-admin.model';
import { TeamCardAdminGradingComponent } from './team-card-admin-grading/team-card-admin-grading.component';
import { GetTeamsAdminGradingService } from '../../services/APIS/get-teams-admin-grading.service';
import { PopupStatusMessageComponent } from '../../shared/popup-status-message/popup-status-message.component';

@Component({
  selector: 'app-admin-grading',
  imports: [TeamCardAdminGradingComponent, PopupStatusMessageComponent],
  templateUrl: './admin-grading.component.html',
  styleUrl: './admin-grading.component.css',
})
export class AdminGradingComponent implements OnInit {
  private getTeamsAdminGradingService = inject(GetTeamsAdminGradingService);
  private destroyRef = inject(DestroyRef);
  teams = signal<TeamAdmin[]>([]);
  criterias = signal<CriteriaAdmin[]>([]);

  ngOnInit() {
    const subscription = this.getTeamsAdminGradingService.getTeams().subscribe({
      next: (res) => {
        const resData = res as AdminTeamsResponse;
        const teams = resData.data.teamsWithCriteriaBySpecialtyGroup
          .map((s) => s.teams)
          .flat();
        this.teams.set(teams);
        const criterias = resData.data.teamsWithCriteriaBySpecialtyGroup
          .map((s) => s.criterias)
          .flat();
        this.criterias.set(criterias);
      },
      error: (err) => {
        // console.log(err)
      },
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  getFilteredCriterias(specialty: string) {
    return this.criterias()?.filter((c) => c.specialty === specialty) || [];
  }
  submitForm(data: {
    teamId: number;
    scheduleId: number;
    grades: { criteriaId: number; grade: number }[];
  }) {
    const subscription = this.getTeamsAdminGradingService
      .submitTeamGrades(data)
      .subscribe({
        next: (res) => {
          const resData = res as any;
          this.showPopupMessage(resData.message, true);
          // this.teams.update((old) =>
          //   old.filter((t) => t.teamId != data.teamId)
          // );
        },
        error: (err) => {
          // console.log(err);
          this.showPopupMessage(err.error.message, false);
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
