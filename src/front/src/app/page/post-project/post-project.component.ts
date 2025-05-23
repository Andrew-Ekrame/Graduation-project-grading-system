import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill Snow theme CSS
import 'quill/dist/quill.bubble.css'; // Import Quill Bubble theme CSS
import { PostProjectService } from '../../services/APIS/post-project.service';
import {
  PostProjectReq,
  PostProjectRes,
  PostProjectTeamReq,
} from '../../services/models/post-project.model';
import { PopupStatusMessageComponent } from '../../shared/popup-status-message/popup-status-message.component';
import { StoringUserService } from '../../services/auth/storing-user.service';

@Component({
  selector: 'app-post-project',
  templateUrl: './post-project.component.html',
  imports: [ReactiveFormsModule, FormsModule, PopupStatusMessageComponent],
  styleUrls: ['./post-project.component.css'],
})
export class PostProjectComponent implements OnInit {
  //testing quill
  @ViewChild('editorContainer', { static: true })
  editorContainer: ElementRef | null = null;
  editor: Quill | undefined;
  private destroyRef = inject(DestroyRef);
  private postProjectService = inject(PostProjectService);
  private storingService = inject(StoringUserService);
  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required],
    }),
  });
  ngOnInit() {
    // console.log('ngOnInit in post project');

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
      } catch (error) {
        // console.error('Error creating Quill editor:', error);
      }
    } else {
      // console.error('Element with #editorContainer not found!');
    }
  }
  popUpMessage = '';
  popUpStatus = true;
  showPopUp = signal<boolean>(false);
  onSubmit() {
    const editorContent = this.editor?.root?.innerHTML || '';
    // console.log('Form submitted!');
    // console.log('Title:', this.form.value.title);
    // console.log('Description:', editorContent);
    if (
      editorContent === '' ||
      !this.form.valid ||
      editorContent === '<p><br></p>'
    ) {
      return;
    } else if (
      editorContent !== '' &&
      this.form.valid &&
      editorContent !== '<p><br></p>'
    ) {
      let body: PostProjectReq | PostProjectTeamReq;
      if (this.storingService.currentUserProfilePublic()?.role === 'Student') {
        body = {
          name: this.form.value.title ?? '',
          description: editorContent,
          teamId: this.storingService.currentUserProfilePublic()?.teamId,
        };
      } else if (
        this.storingService.currentUserProfilePublic()?.role === 'Doctor'
      ) {
        body = {
          name: this.form.value.title ?? '',
          description: editorContent,
        };
      }
      const subscription = this.postProjectService.post(body!).subscribe({
        next: (res: PostProjectRes) => {
          this.popUpMessage = res.message ?? 'Project posted successfully';
          this.popUpStatus = true;
          this.showPopUp.set(true);
        },
        error: (err) => {
          // console.log(err.error.message);
          this.popUpMessage = err.error.message ?? 'Failed to post project';
          this.popUpStatus = false;
          this.showPopUp.set(true);
        },
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
    }
  }

  hidePopUp() {
    this.popUpMessage = '';
    this.popUpStatus = true;
    this.showPopUp.set(false);
  }

  // Method to parse HTML from API
  // parseHtmlFromApi(html: string): SafeHtml {
  //   return this.sanitizer.bypassSecurityTrustHtml(html);
  // }
}
