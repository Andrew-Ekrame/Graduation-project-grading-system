import {
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PendingProjectFromTeam } from '../../../../services/models/pending-projects-from-teams.model';
import { Doctor } from '../../../../services/models/get-allDoctors.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pending-team-card',
  imports: [FormsModule],
  templateUrl: './pending-team-card.component.html',
  styleUrl: './pending-team-card.component.css',
})
export class PendingTeamCardComponent implements OnInit {
  ideas = input.required<PendingProjectFromTeam>();
  doctor = input.required<Doctor[]>();
  selectedDr = signal<number | null>(null);
  reviewData = output<{
    projectId: number;
    status: 'Accepted' | 'Rejected';
    doctorId: number;
  }>();
  ngOnInit() {
    this.selectedDr.set(this.doctor()[0].doctorId);
  }
  /*parsing project description from quill*/
  private sanitizer = inject(DomSanitizer);
  parseHtmlFromApi(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  onClick(status: 'Accepted' | 'Rejected') {
    this.reviewData.emit({
      projectId: this.ideas().id,
      status: status,
      doctorId: this.selectedDr()!,
    });
  }
}
