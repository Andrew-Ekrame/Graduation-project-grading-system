import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StoringUserService } from '../auth/storing-user.service';
import { CreatedTask } from '../models/created-task.model';
import { apiCreateTask } from '../api-exports.model.';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskService {
  private http = inject(HttpClient);
  private storingService = inject(StoringUserService);
  private apiCreateTask = apiCreateTask;
  createTask(form: CreatedTask) {
    const supervisorId = this.storingService
      .currentUserProfilePublic()
      ?.id.toString();
    const formData = new FormData();
    formData.append('Name', form.Name);
    formData.append('Description', form.Description);
    formData.append('Deadline', form.Deadline);
    formData.append('TeamId', form.TeamId.toString());
    form.StudentIds.forEach((id, index) => {
      formData.append(`studentIds[${index}]`, id.toString());
    });
    if (supervisorId) {
      formData.append('SupervisorId', supervisorId);
    } else {
      throw new Error('SupervisorId is undefined');
    }
    // console.log(formData);
    const body = {
      name: form.Name,
      description: form.Description,
      deadline: form.Deadline,
      teamId: form.TeamId,
      studentIds: form.StudentIds,
      supervisorId: supervisorId,
    };
    const headers = {
      Authorization: `Bearer ${this.storingService.currentUserTokenPublic()}`,
    };
    return this.http
      .post(this.apiCreateTask, formData, { headers: headers })
      .pipe(
        tap((res) => {
          const resData = res as any;
          if (resData.statusCode !== 200) {
            throw new Error(resData.message ?? 'Failed to create task');
          }
        })
      );
  }
}
