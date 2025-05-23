import { Component, computed, input, OnInit, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Criteria } from '../../../../services/models/criteria-list.model';

@Component({
  selector: 'app-criteria-card',
  standalone: true,
  imports: [],
  templateUrl: './criteria-card.component.html',
  styleUrl: './criteria-card.component.css',
})
export class CriteriaCardComponent {
  criteriaInput = input.required<Criteria>();
  selectedCriteria = output<Criteria>();
  deleteCriteria = output<Criteria>();
  criteria = computed(() => {
    const criteria = this.criteriaInput();
    return {
      ...criteria,
      createdAt: new DatePipe('en-US').transform(
        criteria.createdAt,
        'dd/MM/yyyy'
      ),
      lastUpdatedAt: new DatePipe('en-US').transform(
        criteria.lastUpdatedAt,
        'dd/MM/yyyy'
      ),
    };
  });

  onEditClick() {
    this.selectedCriteria.emit(this.criteriaInput());
  }

  onDeleteClick() {
    this.deleteCriteria.emit(this.criteriaInput());
  }
}
