export interface MyGradesResponse {
  statusCode: number;
  message: string;
  data: MyGradesData;
}

export interface MyGradesData {
  isSuccess: boolean;
  grades: MyGrade[];
}

export interface MyGrade {
  criteriaId: number;
  criteriaName: string;
  criteriaDescription: string;
  givenTo: 'Team' | 'Student';
  maximumGrade: number;
  grade: number; // could be float
  evaluatorRole: 'Admin' | 'Examiner' | 'Supervisor';
}
