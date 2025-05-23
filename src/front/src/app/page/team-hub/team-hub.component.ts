import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { StoringUserService } from '../../services/auth/storing-user.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { AddTaskComponent } from './tasks-list/add-task/add-task.component';
import { SearchForMembersComponent } from './search-for-members/search-for-members.component';
import { CreateTeamService } from '../../services/APIS/create-team.service';
import { PopupStatusMessageComponent } from '../../shared/popup-status-message/popup-status-message.component';
import { UserObjectModel } from '../../services/models/user-object.model';
import { LoginService } from '../../services/auth/login.service';
import { GetTeamMembersService } from '../../services/APIS/get-team-members.service';
import { Team, TeamMember } from '../../services/models/doctor-teams.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamData } from '../../services/models/team-data.model';
import { GetProjectByIdService } from '../../services/APIS/get-project-by-id.service';
import { GetStudentsWithoutTeamsService } from '../../services/APIS/get-students-without-teams.service';
import {
  Student,
  StudentsWithoutTeamResponse,
} from '../../services/models/students-without-team.model';
import {
  ProjectIdea,
  ProjectResponse,
} from '../../services/models/project-by-id.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-team-hub',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TasksListComponent,
    AddTaskComponent,
    SearchForMembersComponent,
    PopupStatusMessageComponent,
  ],

  templateUrl: './team-hub.component.html',
  styleUrl: './team-hub.component.css',
})
export class TeamHubComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private createTeamService = inject(CreateTeamService);
  storingService = inject(StoringUserService);
  private loginService = inject(LoginService);
  private route = inject(ActivatedRoute);
  //state management
  //hard coded team size to enable invitation
  teamSize = 3;
  openSearch = signal<boolean>(false);
  // inTeam = signal<boolean>(false);
  inTeam = computed(() => {
    // console.log('updating inTeam');
    if (this.storingService.currentUserProfilePublic()?.role === 'Doctor') {
      return true;
    }
    return this.storingService.currentUserProfilePublic()?.inTeam
      ? true
      : false;
  });
  //leader
  isLeader = signal<boolean>(false);
  openFormInputs = signal<boolean>(false);
  openAddTask = signal<boolean>(false);
  openPopUp = signal<boolean>(false);
  //form validation
  form = new FormGroup({
    teamName: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  //validation error message
  error = signal<string>('');
  //popup inputs
  message = signal<string>('');
  status = signal<boolean>(false);
  //getting team data (members,project details,tasks) and students list for invitation if team < 4
  //team members
  private getTeamMembersService = inject(GetTeamMembersService);
  teamMembers = signal<TeamMember[]>([]);
  teamData = signal<Team | null>(null);
  teamDataFound = signal<boolean>(false);
  //project details
  private projectDetailsService = inject(GetProjectByIdService);
  project = signal<ProjectIdea | null>(null);
  projectLoading = signal<boolean>(true);
  projectNotFoundMessage = signal<string>('');
  //invitations
  private getStudentsWithoutTeamsService = inject(
    GetStudentsWithoutTeamsService
  );
  studentsWithoutTeams = signal<Student[]>([]);
  ngOnInit() {
    //if user is doctor then we get team id from url params
    //if user is student then we get team id from user profile
    const userProfile = this.storingService.currentUserProfilePublic();

    //getting team members
    if (userProfile) {
      if (userProfile.role === 'Doctor') {
        // Get teamId from URL params
        const subscription = this.route.params.subscribe((params) => {
          const teamId = params['teamId']; // assuming your route parameter is named 'teamId'

          if (teamId) {
            const apiCall = this.getTeamMembersService
              .getTeamMembers(teamId)
              .subscribe({
                next: (res) => {
                  res = res as TeamData;
                  this.teamMembers.set(res.data.team.members);
                  this.teamData.set(res.data.team);
                  this.teamDataFound.set(true);
                },
                error: (err) => {
                  // console.log(err.error.message);
                },
              });
            this.destroyRef.onDestroy(() => {
              apiCall.unsubscribe();
            });
          }
        });

        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        });
      } else {
        // For students, use team ID from user profile
        if (userProfile.teamId) {
          const subscription = this.getTeamMembersService
            .getTeamMembers(userProfile.teamId)
            .subscribe({
              next: (res) => {
                const resData = res as TeamData;
                this.teamMembers.set(resData.data.team.members);
                this.teamData.set(resData.data.team);
                if (this.teamData()?.leaderId === userProfile.id) {
                  this.isLeader.set(true);
                }
                this.teamDataFound.set(true);
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
    }

    //getting project details
    if (userProfile) {
      if (userProfile.role === 'Doctor') {
        // Get teamId from URL params
        const subscription = this.route.params.subscribe((params) => {
          const teamId = params['teamId'];
          // console.log(teamId);
          if (teamId) {
            // console.log(teamId);
            const apiCall = this.projectDetailsService
              .getProjectById(teamId)
              .subscribe({
                next: (res) => {
                  const resData = res as ProjectResponse;
                  this.project.set(resData.data.projectIdea);
                  this.projectLoading.set(false);
                  this.projectNotFoundMessage.set('');
                },
                error: (err) => {
                  console.log(err.error.message);
                  this.projectNotFoundMessage.set(err.error.message);
                  this.projectLoading.set(false);
                },
              });
            this.destroyRef.onDestroy(() => {
              apiCall.unsubscribe();
            });
          }
          this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
          });
        });
      } else {
        const subscription = this.projectDetailsService
          .getProjectById(userProfile.teamId!)
          .subscribe({
            next: (res) => {
              const resData = res as ProjectResponse;
              this.project.set(resData.data.projectIdea);
              this.projectLoading.set(false);
              this.projectNotFoundMessage.set('');
            },
            error: (err) => {
              console.log(err.error.message);
              this.projectNotFoundMessage.set(err.error.message);
              this.projectLoading.set(false);
            },
          });
        this.destroyRef.onDestroy(() => {
          subscription.unsubscribe();
        });
        //getting list of students for invitation
        if (this.teamMembers().length < 4) {
          const subscription = this.getStudentsWithoutTeamsService
            .getStudentsWithoutTeams()
            .subscribe({
              next: (res) => {
                const resData = res as StudentsWithoutTeamResponse;
                this.studentsWithoutTeams.set(resData.data.students);
              },
              error: (err) => {
                console.log(err.error.message);
              },
            });
          this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
          });
        }
      }
    }
  }

  //create team api call
  private router = inject(Router);
  createTeam() {
    if (this.form.valid) {
      this.error.set('');
      const subscription = this.createTeamService
        .createTeam(this.form.controls.teamName?.value || '')
        .subscribe({
          next: (res) => {
            const resData = res as any;
            this.message.set(resData.message);
            this.status.set(true);
            this.openPopUp.set(true);
            setTimeout(() => {
              this.getUserProfile();
              // this.router.navigate(['/home']);
            }, 2000);
          },
          error: (err) => {
            this.message.set(err.error.message);
            this.status.set(false);
            this.openPopUp.set(true);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    } else {
      this.error.set('* Team name is required');
    }
  }
  //update user profile
  getUserProfile() {
    const subscription = this.loginService.userProfile().subscribe({
      next: (res) => {
        const resData = res as UserObjectModel;
        this.storingService.saveProfile(resData.data);
      },
      error: (error: Error) => {
        console.log(error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  //getter leaderId
  get teamLeaderId() {
    return this.teamData()?.leaderId!;
  }
  //event handlers
  openForm() {
    this.openFormInputs.set(true);
  }
  openAddNewTask() {
    this.openAddTask.set(true);
  }
  closeAddNewTask() {
    this.openAddTask.set(false);
  }
  openSearchComponent() {
    this.openSearch.set(true);
  }
  closeSearchComponent() {
    this.openSearch.set(false);
  }
  hidePopUp() {
    this.openPopUp.set(false);
  }
  popup(data: { message: string; status: boolean }) {
    this.message.set(data.message);
    this.status.set(data.status);
    this.openPopUp.set(true);
  }
  get checkLeader() {
    return (
      this.teamSize < 4 &&
      this.storingService.currentUserProfilePublic()?.role !== 'Doctor' &&
      this.storingService.currentUserProfilePublic()?.role === 'Student' &&
      this.storingService.currentUserProfilePublic()?.id ===
        this.teamData()?.leaderId
    );
  }
  //parsing the html from quill editor
  private sanitizer = inject(DomSanitizer);
  html = computed(() => {
    return this.parseHtmlFromApi(this.project()?.projectDescription!);
  });
  parseHtmlFromApi(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
