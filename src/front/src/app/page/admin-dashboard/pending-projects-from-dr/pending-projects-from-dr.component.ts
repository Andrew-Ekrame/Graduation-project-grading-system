import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PendingDoctorProjectsService } from '../../../services/APIS/pending-doctor-projects.service';
import {
  PendingDoctorProject,
  PendingDrProjectsResponse,
} from '../../../services/models/pending-dr-projects.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'quill/dist/quill.snow.css'; // Import Quill Snow theme CSS
import 'quill/dist/quill.bubble.css';
import { PopupStatusMessageComponent } from '../../../shared/popup-status-message/popup-status-message.component'; // Import Quill Bubble theme CSS

@Component({
  selector: 'app-pending-projects-from-dr',
  imports: [PopupStatusMessageComponent],
  templateUrl: './pending-projects-from-dr.component.html',
  styleUrl: './pending-projects-from-dr.component.css',
})
export class PendingProjectsFromDrComponent implements OnInit {
  private pendingProjectsService = inject(PendingDoctorProjectsService);
  private destroyRef = inject(DestroyRef);
  private sanitizer = inject(DomSanitizer);
  projects = signal<PendingDoctorProject[]>([]);
  loadingProjects = signal<boolean>(true);
  //getting data from api
  ngOnInit() {
    const subscription = this.pendingProjectsService.getProjects().subscribe({
      next: (res) => {
        const resData = res as PendingDrProjectsResponse;
        this.projects.update((old) => resData.data.pendingDoctorProjects);
      },
      error: (err) => {
        // console.log(err.error.message);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  parseHtmlFromApi(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  //accepting project
  accept(projectId: number) {
    this.update(projectId, 'Accepted');
  }
  //rejecting project
  reject(projectId: number) {
    this.update(projectId, 'Rejected');
  }
  //calling the update api
  update(projectId: number, status: 'Accepted' | 'Rejected') {
    const subscription = this.pendingProjectsService
      .updatePendingProject(projectId, status)
      .subscribe({
        next: (res) => {
          const resData = res as any;
          this.openPopUp(`Project ${status} successfully`, true);
          this.projects.update((old) =>
            old.filter((project) => project.id !== projectId)
          );
        },
        error: (err) => {
          // console.log(err.error.message);
          this.openPopUp('Something went wrong! Please try again', false);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  //popup methods
  message = signal<string>('');
  status = signal<boolean>(false);
  showPopup = signal<boolean>(false);
  openPopUp(message: string, status: boolean) {
    this.message.set(message);
    this.status.set(status);
    this.showPopup.set(true);
  }
  closePopup() {
    this.showPopup.set(false);
    this.message.set('');
    this.status.set(false);
  }
}
