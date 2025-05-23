import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  Criteria,
  CriteriaListResponse,
} from '../../../services/models/criteria-list.model';
import { CriteriaCardComponent } from './criteria-card/criteria-card.component';
import { GetAllCriteriaService } from '../../../services/APIS/get-all-criteria.service';
import { CriteriaEditorComponent } from './criteria-editor/criteria-editor.component';
import { DeleteCriteriaService } from '../../../services/APIS/delete-criteria.service';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component';
import { UpdateCriteriaService } from '../../../services/APIS/update-criteria.service';

@Component({
  selector: 'app-configure-criteria',
  imports: [
    CriteriaCardComponent,
    CriteriaEditorComponent,
    PopupStatusMessageComponent,
  ],
  templateUrl: './configure-criteria.component.html',
  styleUrl: './configure-criteria.component.css',
})
export class ConfigureCriteriaComponent implements OnInit {
  criteriaList = signal<Criteria[]>([]);
  loading = signal<boolean>(true);
  success = signal<boolean>(false);
  displayedText = signal<string>('Loading criteria...');
  //for editor component
  editorOpened = signal<boolean>(false);
  selectedCriteria = signal<Criteria | null>(null);

  openEditor(data: Criteria) {
    this.selectedCriteria.set(data);
    this.editorOpened.set(true);
  }

  closeEditor() {
    this.editorOpened.set(false);
  }

  //for delete confirmation
  showDeleteConfirm = signal(false);
  criteriaToDelete = signal<Criteria | null>(null);

  openDeleteConfirm(criteria: Criteria) {
    this.criteriaToDelete.set(criteria);
    this.showDeleteConfirm.set(true);
  }

  cancelDeleteConfirm() {
    this.showDeleteConfirm.set(false);
    this.criteriaToDelete.set(null);
  }

  confirmDelete() {
    if (this.criteriaToDelete()) {
      this.deleteCriteria(this.criteriaToDelete()!);
    }
  }

  //getting criteria on initialization
  private destroyRef = inject(DestroyRef);
  private getAllCriteriaService = inject(GetAllCriteriaService);
  ngOnInit() {
    this.getAllCriteria();
  }

  getAllCriteria() {
    const subscription = this.getAllCriteriaService.getAllCriteria().subscribe({
      next: (res) => {
        const resData = res as CriteriaListResponse;
        this.criteriaList.set(resData.data.criteriaList);
        this.loading.set(false);
        this.success.set(true);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  //deleting criteria
  private deleteCriteriaService = inject(DeleteCriteriaService);
  deleteCriteria(criteria: Criteria) {
    const subscription = this.deleteCriteriaService
      .deleteCriteria(criteria.id)
      .subscribe({
        next: (res) => {
          this.showDeleteConfirm.set(false);
          this.criteriaToDelete.set(null);
          this.criteriaList.update((old) => {
            return old.filter((c) => c.id !== criteria.id);
          });
          this.showPopupMessage('Criteria deleted successfully', true);
        },
        error: (err) => {
          this.cancelDeleteConfirm();
          this.showPopupMessage(
            err.error.message ? err.error.message : 'Failed to delete',
            false
          );
          // console.log(err);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //edit the criteria
  private updateCriteriaService = inject(UpdateCriteriaService);
  editCriteria(data: {
    id: number;
    name: string;
    description: string;
    maxGrade: number;
    evaluator: 'Examiner' | 'Supervisor' | 'Admin';
    givenTo: 'Team' | 'Student';
    specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS';
    term: 'First-Term' | 'Second-Term';
  }) {
    const subscription = this.updateCriteriaService
      .updateCriteria(data)
      .subscribe({
        next: (res) => {
          this.showPopupMessage('Criteria updated successfully', true);
          this.getAllCriteria();
          this.closeEditor();
        },
        error: (err) => {
          this.showPopupMessage(
            err.error.message ? err.error.message : 'Failed to update',
            false
          );
          // console.log(err);
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //popup
  showPopup = signal<boolean>(false);
  status = signal<boolean>(false);
  message = signal<string>('');
  closePopup() {
    this.showPopup.set(false);
    this.status.set(false);
    this.message.set('');
  }
  showPopupMessage(message: string, status: boolean) {
    this.status.set(status);
    this.message.set(message);
    this.showPopup.set(true);
  }
}
