import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { AcceptedProject } from '../../../services/models/get-accepted-project.model';
import 'quill/dist/quill.snow.css'; // Import Quill Snow theme CSS
import 'quill/dist/quill.bubble.css'; // Import Quill Bubble theme CSS
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { StoringUserService } from '../../../services/auth/storing-user.service';
import { ApplyOnProjectService } from '../../../services/APIS/apply-on-project.service';
@Component({
  selector: 'app-project-info-overlay',
  imports: [],
  templateUrl: './project-info-overlay.component.html',
  styleUrl: './project-info-overlay.component.css',
})
export class ProjectInfoOverlayComponent {
  project = input.required<AcceptedProject | null>();
  close = output<boolean>();
  private sanitizer = inject(DomSanitizer);
  storingService = inject(StoringUserService);
  html = computed(() => {
    return this.parseHtmlFromApi(this.project()?.description || '');
  });
  closeOverlay() {
    this.close.emit(false);
  }
  parseHtmlFromApi(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  get ableToApply() {
    const profile = this.storingService.currentUserProfilePublic();
    const hasProject = profile?.hasProject;
    const leaderOfTeam = profile?.leaderOfTeamId ?? false;
    const isCs = profile?.specialty === 'CS';
    const isStudent = profile?.role === 'Student';
    const secondTerm = profile?.currentAcademicSemester === 'Second-Term';
    const allowedCs = !hasProject && leaderOfTeam && isCs && isStudent;
    const allowedNonCs =
      !hasProject &&
      leaderOfTeam &&
      !isCs &&
      secondTerm &&
      isStudent &&
      secondTerm;
    //console log each comparison with its name and result
    // console.log('hasProject:', hasProject);
    // console.log('leaderOfTeam:', leaderOfTeam);
    // console.log('isCs:', isCs);
    // console.log('isStudent:', isStudent);
    // console.log('secondTerm:', secondTerm);
    // console.log('allowedCs:', allowedCs);
    // console.log('allowedNonCs:', allowedNonCs);
    return allowedCs || allowedNonCs;
    // return (
    //   profile?.role === 'Student' &&
    //   profile?.leaderOfTeamId &&
    //   (profile?.specilaity === 'CS' ||
    //     (profile?.specilaity !== ('CS' as const) &&
    //       profile?.currentTerm === 'Second-Term'))
    // );
  }
  //calling apply on project api
  private applyOnProjectService = inject(ApplyOnProjectService);
  private destroyRef = inject(DestroyRef);
  popup = output<{
    message: string;
    status: boolean;
  }>();
  applyOnProject() {
    const projectId = this.project()?.id;
    const doctorId = this.project()?.doctorId;
    const subscription = this.applyOnProjectService
      .applyOnProject(doctorId!, projectId!)
      .subscribe({
        next: (res) => {
          const resData = res as any;
          this.closeOverlay();
          this.popup.emit({ message: resData.message, status: true });
        },
        error: (err) => {
          this.popup.emit({ message: err.error.message, status: false });
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
