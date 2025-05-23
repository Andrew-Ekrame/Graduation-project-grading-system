import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { TeamScheduleData } from '../../../services/models/schedule-details.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-schedule-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './schedule-card-dr.component.html',
  styleUrl: './schedule-card-dr.component.css',
})
export class ScheduleCardDrComponent {
  schedule = input.required<TeamScheduleData>();
  private sanitizer = inject(DomSanitizer);

  html = computed(() => {
    return this.parseHtmlFromApi(this.schedule().projectDescription || '');
  });

  parseHtmlFromApi(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
