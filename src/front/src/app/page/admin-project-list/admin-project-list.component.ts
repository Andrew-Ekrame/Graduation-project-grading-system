import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ProjectListItemComponent } from './project-list-item/project-list-item.component';
import { CommonModule } from '@angular/common';
import {
  ProjectIdea,
  ProjectIdeasResponse,
} from '../../services/models/all-project-ideas.model';
import { FinalProjectsService } from '../../services/APIS/final-projects.service';

@Component({
  selector: 'app-admin-project-list',
  imports: [ProjectListItemComponent, CommonModule],
  templateUrl: './admin-project-list.component.html',
  styleUrl: './admin-project-list.component.css',
})
export class AdminProjectListComponent implements OnInit {
  projects = signal<ProjectIdea[]>([]);
  private finalProjectsService = inject(FinalProjectsService);
  private destroyRef = inject(DestroyRef);
  ngOnInit() {
    this.getProjectIdeas();
  }
  private getProjectIdeas() {
    const subscription = this.finalProjectsService.getProjectIdeas().subscribe({
      next: (res) => {
        const resData = res as ProjectIdeasResponse;
        this.projects.set(resData.data.finalProjectIdeas);
      },
      error: (err) => {
        // console.error(err);
      },
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
