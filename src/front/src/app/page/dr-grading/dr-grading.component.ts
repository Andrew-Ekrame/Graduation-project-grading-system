import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { GradeTeamComponent } from './grade-team/grade-team.component';
import { GetTeamsForDrGradingService } from '../../services/APIS/get-teams-for-dr-grading.service';
import {
  CriteriaSupervisor,
  SpecialtyGroup,
  TeamForGradingSupervisor,
  TeamsForGradingSupervisorResponse,
} from '../../services/models/teams-for-grading-supervisor.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TeamsForGradingExaminerResponse } from '../../services/models/teams-for-grading-examiner.model';
import { PopupStatusMessageComponent } from '../../shared/popup-status-message/popup-status-message.component';

@Component({
  selector: 'app-dr-grading',
  imports: [GradeTeamComponent, PopupStatusMessageComponent],
  templateUrl: './dr-grading.component.html',
  styleUrl: './dr-grading.component.css',
})
export class DrGradingComponent implements OnInit {
  //services
  private destroyRef = inject(DestroyRef);
  private getTeamsForDrGradingService = inject(GetTeamsForDrGradingService);

  //loading and success of loading states
  loadingSupervisedTeams = signal<boolean>(true);
  loadingExaminedTeams = signal<boolean>(true);
  successSupervised = signal<boolean>(false);
  successExamined = signal<boolean>(false);
  displayedTextSupervised = signal<string>('Loading supervised teams...');
  displayedTextExamined = signal<string>('Loading examined teams...');

  //data
  supervisedTeamsBySpecialty = signal<SpecialtyGroup[]>([]);
  examinedTeamsBySpecialty = signal<SpecialtyGroup[]>([]);
  //methods to get supervised and examined teams
  getSupervisedTeams() {
    const subscription = this.getTeamsForDrGradingService
      .getTeamsForSupervisorGrading()
      .subscribe({
        next: (res) => {
          const resData = res as TeamsForGradingSupervisorResponse;
          this.supervisedTeamsBySpecialty.set(
            resData.data.supervisorTeamsWithCriteriaBySpecialtyGroup
          );
          this.loadingSupervisedTeams.set(false);
          this.successSupervised.set(true);
          this.displayedTextSupervised.set('Supervised Teams');
        },
        error: (err) => {
          this.loadingSupervisedTeams.set(false);
          this.displayedTextSupervised.set(err.error.message);
          // console.log(err);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  getExaminedTeams() {
    const subscription = this.getTeamsForDrGradingService
      .getTeamsForExaminerGrading()
      .subscribe({
        next: (res) => {
          const resData = res as TeamsForGradingExaminerResponse;
          this.examinedTeamsBySpecialty.set(
            resData.data.examinerTeamsWithCriteriaBySpecialtyGroup
          );
          this.loadingExaminedTeams.set(false);
          this.successExamined.set(true);
          this.displayedTextExamined.set('Examined Teams');
        },
        error: (err) => {
          this.loadingExaminedTeams.set(false);
          this.displayedTextExamined.set(err.error.message);
          // console.log(err);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  ngOnInit() {
    this.getSupervisedTeams();
    this.getExaminedTeams();
  }

  //opening & closing the grading component with inputs
  //inputs
  selectedTeam = signal<TeamForGradingSupervisor | null>(null);
  selectedCriteria = signal<CriteriaSupervisor[] | null>(null);
  //close & open
  isGradingOpen = signal<boolean>(false);
  openSupervisedTeamGrading(specialty: string, id: number) {
    const specialtyGroup = this.supervisedTeamsBySpecialty().find(
      (group) => group.specialty === specialty
    );
    const team = specialtyGroup?.teams.find((team) => team.teamId === id);
    const criteria = specialtyGroup?.criterias;
    this.selectedTeam.set(team!);
    this.selectedCriteria.set(criteria!);
    // console.log(team, criteria);
    this.isGradingOpen.set(true);
  }
  openExaminedTeamGrading(specialty: string, id: number) {
    const specialtyGroup = this.examinedTeamsBySpecialty().find(
      (group) => group.specialty === specialty
    );
    const team = specialtyGroup?.teams.find((team) => team.teamId === id);
    const criteria = specialtyGroup?.criterias;
    this.selectedTeam.set(team!);
    this.selectedCriteria.set(criteria!);
    // console.log(team, criteria);
    this.isGradingOpen.set(true);
  }
  closeTeamGrading() {
    this.isGradingOpen.set(false);
    this.selectedTeam.set(null);
  }
  //parsing the html from quill editor
  private sanitizer = inject(DomSanitizer);
  htmlParser(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  //popup
  showPopup = signal<boolean>(false);
  status = signal<boolean>(false);
  message = signal<string>('');
  showConfirm = signal<boolean>(false);

  closePopup() {
    this.showPopup.set(false);
    this.message.set('');
    this.status.set(false);
  }
  showPopupMessage(data: { message: string; status: boolean }) {
    this.showPopup.set(true);
    this.message.set(data.message);
    this.status.set(data.status);
  }
}
