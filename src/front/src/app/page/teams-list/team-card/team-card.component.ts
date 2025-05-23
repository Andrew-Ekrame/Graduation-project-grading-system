import { Component, input } from '@angular/core';
import { Team } from '../../../services/models/doctor-teams.model';

@Component({
  selector: 'app-team-card',
  imports: [],
  templateUrl: './team-card.component.html',
  styleUrl: './team-card.component.css',
})
export class TeamCardComponent {
  team = input.required<Team>();
  
}
