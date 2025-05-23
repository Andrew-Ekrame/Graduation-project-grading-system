import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { PageComponent } from './page/page.component';
import { TeamHubComponent } from './page/team-hub/team-hub.component';
import { PostProjectComponent } from './page/post-project/post-project.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminProjectListComponent } from './page/admin-project-list/admin-project-list.component';
import { ProjectRequestsComponent } from './page/project-requests/project-requests.component';
import { ProjectsListComponent } from './page/projects-list/projects-list.component';
import { TeamsListComponent } from './page/teams-list/teams-list.component';
import { pageAuthGuardService } from './services/auth/auth-guard.service';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AccountAuthGuardService } from './services/auth/account-auth-guard.service';
import { TeamInvitesComponent } from './page/team-invites/team-invites.component';
import { ScheduleComponent } from './page/schedule/schedule.component';
import { MyGradesComponent } from './page/my-grades/my-grades.component';
import { AdminDashboardComponent } from './page/admin-dashboard/admin-dashboard.component';
import { SendInstructionsComponent } from './page/admin-dashboard/send-instructions/send-instructions.component';
import { CreateDrAccComponent } from './page/admin-dashboard/create-dr-acc/create-dr-acc.component';
import { CreateScheduleComponent } from './page/admin-dashboard/create-schedule/create-schedule.component';
import { PendingProjectsFromDrComponent } from './page/admin-dashboard/pending-projects-from-dr/pending-projects-from-dr.component';
import { PendingProjectsFromTeamsComponent } from './page/admin-dashboard/pending-projects-from-teams/pending-projects-from-teams.component';
import { AddCriteriaComponent } from './page/admin-dashboard/add-criteria/add-criteria.component';
import { AdminGradingComponent } from './page/admin-grading/admin-grading.component';
import { DrGradingComponent } from './page/dr-grading/dr-grading.component';
import { GradeTeamComponent } from './page/dr-grading/grade-team/grade-team.component';
import { ProfileComponent } from './page/profile/profile.component';
import { SetActiveYearComponent } from './page/admin-dashboard/set-active-year/set-active-year.component';
import { ConfigureCriteriaComponent } from './page/admin-dashboard/configure-criteria/configure-criteria.component';
import { GetGradesReportComponent } from './page/admin-dashboard/get-grades-report/get-grades-report.component';
import { CreateAcademicYearComponent } from './page/admin-dashboard/create-academic-year/create-academic-year.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AccountAuthGuardService],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AccountAuthGuardService],
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    canActivate: [AccountAuthGuardService],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [AccountAuthGuardService],
  },
  {
    path: 'home',
    component: PageComponent,
    canActivate: [pageAuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        children: [
          {
            path: '',
            redirectTo: 'send-instructions',
            pathMatch: 'full',
          },
          {
            path: 'send-instructions',
            component: SendInstructionsComponent,
          },
          {
            path: 'create-dr-account',
            component: CreateDrAccComponent,
          },
          {
            path: 'create-schedule',
            component: CreateScheduleComponent,
          },
          {
            path: 'pending-projects-from-dr',
            component: PendingProjectsFromDrComponent,
          },
          {
            path: 'pending-projects-from-teams',
            component: PendingProjectsFromTeamsComponent,
          },
          {
            path: 'add-criteria',
            component: AddCriteriaComponent,
          },
          {
            path: 'configure-criteria',
            component: ConfigureCriteriaComponent,
          },
          {
            path: 'create-academic-year',
            component: CreateAcademicYearComponent,
          },
          {
            path: 'set-active-year',
            component: SetActiveYearComponent,
          },
          {
            path: 'grades-report',
            component: GetGradesReportComponent,
          },
        ],
      },
      {
        path: 'team-hub', //for student not in team yet
        component: TeamHubComponent,
      },
      {
        path: 'team-hub/:teamId', //if team id is sent (student is in team, doctor seeing his team)
        component: TeamHubComponent,
      },

      {
        path: 'post-project',
        component: PostProjectComponent,
      },
      {
        path: 'all-projects',
        component: AdminProjectListComponent,
      },
      {
        path: 'projects-requests',
        component: ProjectRequestsComponent,
      },
      {
        path: 'available-projects',
        component: ProjectsListComponent,
      },
      {
        path: 'my-teams',
        component: TeamsListComponent,
      },
      {
        path: 'team-invites',
        component: TeamInvitesComponent,
      },
      {
        path: 'schedule',
        component: ScheduleComponent,
      },
      {
        path: 'my-grades',
        component: MyGradesComponent,
      },
      {
        path: 'admin-grading',
        component: AdminGradingComponent,
      },
      {
        path: 'doctor-grading',
        component: DrGradingComponent,
      },
      // {
      //   path: 'grading-page',
      //   component: GradeTeamComponent,
      // },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
