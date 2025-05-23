interface Grade {
  criteriaId: number;
  grade: number;
}

export interface Submission {
  scheduleId: number;
  teamId: number;
  studentId?: number;
  grades: Grade[];
}
