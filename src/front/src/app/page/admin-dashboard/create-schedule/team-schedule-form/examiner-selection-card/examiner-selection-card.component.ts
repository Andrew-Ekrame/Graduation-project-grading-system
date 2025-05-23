import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Doctor } from '../../../../../services/models/get-allDoctors.model';

@Component({
  selector: 'app-examiner-selection-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './examiner-selection-card.component.html',
  styleUrl: './examiner-selection-card.component.css',
})
export class ExaminerSelectionCardComponent {
  examiner = input.required<Doctor>();
  isSelected = input<boolean>(false);
  selected = output<number>();

  onSelect() {
    this.selected.emit(this.examiner().doctorId);
  }
}
