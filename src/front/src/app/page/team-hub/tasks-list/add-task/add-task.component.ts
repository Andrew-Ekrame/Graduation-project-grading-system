import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill Snow theme CSS
import 'quill/dist/quill.bubble.css'; // Import Quill Bubble theme CSS
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Team } from '../../../../services/models/team-data.model';
import { MemberCardComponent } from './member-card/member-card.component';
import { CreatedTask } from '../../../../services/models/created-task.model';
import { CreateTaskService } from '../../../../services/APIS/create-task.service';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, MemberCardComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  @ViewChild('editorContainer', { static: true })
  editorContainer: ElementRef | null = null;
  editor: Quill | undefined;
  teamData = input.required<Team>();
  taskForm: FormGroup;
  quillShowError = signal<boolean>(false);
  private createTaskService = inject(CreateTaskService);
  private destroyRef = inject(DestroyRef);
  popup = output<{ message: string; status: boolean }>();
  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      taskName: ['', Validators.required],
      deadline: ['', Validators.required],
      description: ['', Validators.required],
      selectedMembers: this.fb.array(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    });
  }

  ngOnInit() {
    if (this.editorContainer) {
      try {
        this.editor = new Quill(this.editorContainer.nativeElement, {
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ size: ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link'],
              [{ align: [] }],
              [{ color: [] }, { background: [] }],
              ['clean'],
            ],
          },
          theme: 'snow',
        });

        // Subscribe to Quill changes to update form
        this.editor?.on('text-change', () => {
          const content = this.editor?.root.innerHTML || '';
          this.taskForm.patchValue({
            description: content,
          });
        });
      } catch (error) {
        // console.error('Error creating Quill editor:', error);
      }
    } else {
      // console.error('Element with #editorContainer not found!');
    }
  }

  // Helper methods for form
  get selectedMembers() {
    return this.taskForm.get('selectedMembers') as FormArray;
  }

  //add or remove clicked member to selectedMembers array
  onMemberSelected(event: { id: number; selected: boolean }) {
    const selectedMembers = this.selectedMembers;

    if (event.selected) {
      selectedMembers.push(this.fb.control(event.id));
    } else {
      const index = selectedMembers.controls.findIndex(
        (x) => x.value === event.id
      );
      if (index >= 0) {
        selectedMembers.removeAt(index);
      }
    }
  }

  isQuillEmpty() {
    return (
      this.editor?.root.innerHTML == '<p><br></p>' ||
      this.editor?.root.innerHTML == ''
    );
  }

  onSubmit() {
    this.markFormGroupTouched(this.taskForm);

    if (
      !this.taskForm.valid ||
      this.selectedMembers.length === 0 ||
      this.isQuillEmpty()
    ) {
      // console.error('Form validation failed:', {
      //   formValid: this.taskForm.valid,
      //   memberCount: this.selectedMembers.length,
      //   formErrors: this.taskForm.errors,
      // });
      this.quillShowError.set(true);
      return;
    } else {
      const createdTask: CreatedTask = {
        Name: this.taskForm.get('taskName')?.value,
        Description: this.taskForm.get('description')?.value,
        Deadline: new Date(this.taskForm.get('deadline')?.value).toISOString(),
        TeamId: this.teamData().id,
        StudentIds: this.selectedMembers.value,
      };
      this.quillShowError.set(false);
      //calling the api
      const subscription = this.createTaskService
        .createTask(createdTask)
        .subscribe({
          next: (response) => {
            const res = response as any;
            this.popup.emit({ message: res.message, status: true });
          },
          error: (error) => {
            this.popup.emit({ message: error.error.message, status: false });
            // console.error('Error creating task:', error);
          },
        });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goBackToTasksList = output<boolean>();
  goBack() {
    this.goBackToTasksList.emit(true);
  }
}
