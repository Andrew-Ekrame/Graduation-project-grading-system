import {
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { TaskComponent } from './task/task.component';
import { StoringUserService } from '../../../services/auth/storing-user.service';
import { Team } from '../../../services/models/team-data.model';
import { GetTasksService } from '../../../services/APIS/get-tasks.service';
import {
  TaskResponse,
  Task,
} from '../../../services/models/retrieved-task.model';

@Component({
  selector: 'app-tasks-list',
  imports: [TaskComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent implements OnInit {
  openAddNewTask = output<boolean>();
  storingService = inject(StoringUserService);
  teamData = input.required<Team | null>();
  private getTasksService = inject(GetTasksService);
  private destroyRef = inject(DestroyRef);
  loading = signal<boolean>(true);
  displayedText = signal<string>('Loading tasks...');
  tasksList = signal<Task[]>([]);
  popup = output<{
    message: string;
    status: boolean;
  }>();
  ngOnInit() {
    const subscription = this.getTasksService
      .getTasks(this.teamData()?.id!)
      .subscribe({
        next: (res) => {
          const resData = res as TaskResponse;
          this.tasksList.set(resData.data.teamTasksWithTaskMembers);
          this.loading.set(false);
          this.displayedText.set('');
        },
        error: (err) => {
          // console.error(err);
          this.displayedText.set(err.error.message);
          this.loading.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  openAddTask() {
    this.openAddNewTask.emit(true);
  }

  emitPopup(message: { message: string; status: boolean }) {
    this.popup.emit(message);
  }

  updateTasksList(update: {
    taskId: number;
    memberId: number;
    status: string;
  }) {
    const updatedTasks = this.tasksList().map((task) => {
      if (task.id === update.taskId) {
        const updatedMembers = task.taskMembers.map((member) => {
          if (member.studentId === update.memberId) {
            return { ...member, status: update.status };
          }
          return member;
        });
        return { ...task, taskMembers: updatedMembers };
      }
      return task;
    });
    this.tasksList.set(updatedTasks);
    const updatedTask = this.tasksList().find(
      (task) => task.id === update.taskId
    );
    if (
      updatedTask?.taskMembers.every((member) => member.status === 'Completed')
    ) {
      //update the task status to completed
      const updatedTasksList: Task[] = this.tasksList().map((task) => {
        if (task.id === update.taskId) {
          return { ...task, status: 'Completed' };
        }
        return task;
      });
      this.tasksList.update((old) => updatedTasksList);
    }
  }
}
