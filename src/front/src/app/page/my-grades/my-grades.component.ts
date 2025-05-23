import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  MyCriteria,
  MyCriteriaResponse,
} from '../../services/models/my-criteria.model';
import {
  MyGrade,
  MyGradesResponse,
} from '../../services/models/my-grades.model';
import { GetMyGradesService } from '../../services/APIS/get-my-grades.service';

@Component({
  selector: 'app-my-grades',
  imports: [],
  templateUrl: './my-grades.component.html',
  styleUrl: './my-grades.component.css',
})
export class MyGradesComponent implements OnInit {
  listOfCriteria = signal<MyCriteria[]>([]);
  listOfGrades = signal<MyGrade[]>([]);
  private getMyGradesService = inject(GetMyGradesService);
  private destroyRef = inject(DestroyRef);
  loadingCriteria = signal<boolean>(true);
  successCriteria = signal<boolean>(false);
  loadingGrades = signal<boolean>(true);
  successGrades = signal<boolean>(false);
  textForCriteria = signal<string>('');
  textForGrades = signal<string>('');
  //getting data
  ngOnInit() {
    this.getTheCriteria();
    this.getMyGrades();
  }

  getTheCriteria() {
    const subscription = this.getMyGradesService.getMyCriteria().subscribe({
      next: (res) => {
        const resData = res as MyCriteriaResponse;
        this.listOfCriteria.set(resData.data.criteriaList);
        this.loadingCriteria.set(false);
        this.successCriteria.set(true);
        this.textForCriteria.set('');
      },
      error: (err) => {
        // console.log(err.error.message);
        this.textForCriteria.set(err.error.message ?? '');
        this.loadingCriteria.set(false);
        this.successCriteria.set(false);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
  getMyGrades() {
    const subscription = this.getMyGradesService.getMyGrades().subscribe({
      next: (res) => {
        const resData = res as MyGradesResponse;
        this.listOfGrades.set(resData.data.grades);
        this.loadingGrades.set(false);
        this.successGrades.set(true);
        this.textForGrades.set('');
      },
      error: (err) => {
        // console.log(err.error.message);
        this.textForGrades.set(err.error.message ?? '');
        this.loadingGrades.set(false);
        this.successGrades.set(false);
      },
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  //filtering data
  getFilteredCriteriaFromGiver(givenBy: String) {
    const givenByList = this.listOfCriteria().filter(
      (c) => c.evaluator === givenBy
    );
    return givenByList ?? [];
  }
  getFilteredTeamCriteria(listOfEvaluatorCriteria: MyCriteria[]) {
    const givenToTeam = listOfEvaluatorCriteria.filter(
      (c) => c.givenTo === 'Team'
    );
    return givenToTeam ?? [];
  }
  getFilteredStudentCriteria(listOfEvaluatorCriteria: MyCriteria[]) {
    const givenToStudent = listOfEvaluatorCriteria.filter(
      (c) => c.givenTo === 'Student'
    );
    return givenToStudent ?? [];
  }
}
