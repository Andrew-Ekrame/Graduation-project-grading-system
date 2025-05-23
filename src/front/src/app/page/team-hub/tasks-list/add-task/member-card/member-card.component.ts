import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamMember } from '../../../../../services/models/team-data.model';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent {
  member = input.required<TeamMember>();
  isSelected = signal<boolean>(false);
  memberSelected = output<{id: number, selected: boolean}>();

  onMemberSelect() {
    this.isSelected.update(current => !current);
    this.memberSelected.emit({
      id: this.member().id,
      selected: this.isSelected()
    });
  }
}
