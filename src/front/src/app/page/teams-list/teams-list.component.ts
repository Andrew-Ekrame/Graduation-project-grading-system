import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { TeamCardComponent } from './team-card/team-card.component';
import { RouterLink } from '@angular/router';
import { GetDoctorTeamsService } from '../../services/APIS/get-doctor-teams.service';
import {
  DoctorTeams,
  Team,
} from '../../services/models/doctor-teams.model';

@Component({
  selector: 'app-teams-list',
  imports: [TeamCardComponent, RouterLink],
  templateUrl: './teams-list.component.html',
  styleUrl: './teams-list.component.css',
})
export class TeamsListComponent implements OnInit {
  private getTeamsService = inject(GetDoctorTeamsService);
  private destroyRef = inject(DestroyRef);
  myTeams = signal<Team[]>([]);
  loading = signal<boolean>(true);
  success = signal<boolean>(false);
  displayedText = signal<string>('Loading teams...');
  ngOnInit() {
    const subscription = this.getTeamsService.getTeamsForDoctor().subscribe({
      next: (res) => {
        this.loading.set(false);
        const resData = res as DoctorTeams;
        this.myTeams.set(resData.data.teams);
        if (this.myTeams().length === 0) {
          this.displayedText.set('No teams found.');
        } else {
          this.displayedText.set('');
          this.success.set(true);
        }
      },
      error: (err) => {
        this.loading.set(false);
        this.displayedText.set(err.error.message??'Error loading teams.');
        this.success.set(false);
        // console.error('Error loading teams:', err);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
