import {
  Component,
  DestroyRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Student } from '../../../services/models/students-without-team.model';
import { SendInviteService } from '../../../services/APIS/send-invite.service';
import { Team } from '../../../services/models/team-data.model';

@Component({
  selector: 'app-search-for-members',
  imports: [FormsModule],
  templateUrl: './search-for-members.component.html',
  styleUrl: './search-for-members.component.css',
})
export class SearchForMembersComponent {
  closeSearch = output();
  unassignedStudents = input.required<Student[]>();
  teamData = input.required<Team>();
  enteredName = signal<string>('');
  filteredList = signal<Student[]>([]);
  //send invite api
  private sendInviteService = inject(SendInviteService);
  private destroyRef = inject(DestroyRef);
  sendInvitePopup = output<{
    message: string;
    status: boolean;
  }>();
  ngOnInit() {
    this.filteredList.set(this.unassignedStudents());
  }
  closeSearchComponent() {
    this.closeSearch.emit();
  }
  filterTheList() {
    if (this.enteredName() !== '') {
      this.filteredList.set(
        this.unassignedStudents()
          .filter((value) => {
            if (
              value.fullName
                .toLowerCase()
                .includes(this.enteredName().toLowerCase())
            ) {
              return true;
            }
            return false;
          })
          .sort((a, b) => {
            if (a.fullName < b.fullName) {
              return 1;
            }
            return -1;
          })
      );
    } else {
      this.filteredList.set(this.unassignedStudents());
    }
  }
  selectedStudent = signal<null | Student>(null);
  setSelectedMember(student: Student) {
    this.selectedStudent.set(student);
    this.openInvitationConfirm();
  }
  //confirm popup
  showInvitationConfirm = signal<boolean>(false);
  closeInvitationConfirm() {
    this.showInvitationConfirm.set(false);
  }
  openInvitationConfirm() {
    this.showInvitationConfirm.set(true);
  }
  //send invite
  sendInvite() {
    const subscription = this.sendInviteService
      .sendInvite(
        this.teamData().leaderId,
        this.teamData().id,
        this.selectedStudent()?.id!
      )
      .subscribe({
        next: (res) => {
          this.sendInvitePopup.emit({
            message: 'Invitation sent successfully',
            status: true,
          });
          this.closeInvitationConfirm();
          this.selectedStudent.set(null);
        },
        error: (err) => {
          this.sendInvitePopup.emit({
            message: err.error.message,
            status: false,
          });
          this.closeInvitationConfirm();
          this.selectedStudent.set(null);
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
