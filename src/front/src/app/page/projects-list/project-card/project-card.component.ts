import { Component, input, output } from '@angular/core';
import { AcceptedProject } from '../../../services/models/get-accepted-project.model';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.css',
})
export class ProjectCardComponent {
  showOverlay = output<{ value: boolean; id: number }>();
  project = input.required<AcceptedProject>();
  openOverlay() {
    const emitted = { value: true, id: this.project().id };
    this.showOverlay.emit(emitted);
  }
}
