import { Component, computed, inject, input, output } from '@angular/core';
import { ProjectIdea } from '../../../services/models/all-project-ideas.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-project-list-item',
  imports: [],
  templateUrl: './project-list-item.component.html',
  styleUrl: './project-list-item.component.css',
})
export class ProjectListItemComponent {
  project = input.required<ProjectIdea>();
  private sanitizer = inject(DomSanitizer);
  html = computed(() => {
    return this.parseHtmlFromApi(this.project().projectDescription!);
  });
  parseHtmlFromApi(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
