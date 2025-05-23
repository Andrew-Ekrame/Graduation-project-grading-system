import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
} from '@angular/core';
import { StoringUserService } from '../../../../services/auth/storing-user.service';
import {
  Task,
  TeamMember,
} from '../../../../services/models/retrieved-task.model';
import { DatePipe, NgClass } from '@angular/common';
import { ReviewTaskService } from '../../../../services/APIS/review-task.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-task',
  imports: [NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent implements OnInit {
  storingService = inject(StoringUserService);
  task = input.required<Task>();
  members = computed<TeamMember[]>(() => {
    return this.task().taskMembers;
  });
  popup = output<{
    message: string;
    status: boolean;
  }>();
  changes = output<{
    memberId: number;
    taskId: number;
    status: string;
  }>();
  private reviewTaskService = inject(ReviewTaskService);
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    const date = new Date(this.task().deadline);
    const datePipe = new DatePipe('en-US');
    this.task().deadline = datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  markTaskAsFinished(studentId: number) {
    const subscription = this.reviewTaskService
      .reviewTask(this.task().id, studentId)
      .subscribe({
        next: (res) => {
          const resData = res as any;
          this.emitPopup(resData.message, true);
          this.emitChanges(studentId, this.task().id, 'Completed');
        },
        error: (err) => {
          // console.error(err);
          this.emitPopup(err.error.message, false);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  emitPopup(message: string, status: boolean) {
    this.popup.emit({ message, status });
  }
  emitChanges(memberId: number, taskId: number, status: string) {
    this.changes.emit({ memberId, taskId, status });
  }
  //parsing the html from quill editor
  private sanitizer = inject(DomSanitizer);
  html = computed(() => {
    return this.parseHtmlFromApi(this.task().description);
  });
  parseHtmlFromApi(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
