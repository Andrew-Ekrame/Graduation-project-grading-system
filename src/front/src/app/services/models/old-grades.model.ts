export interface Evaluation {
  evaluationId: number;
  criteriaId: number;
  criteriaName: string;
  criteriaDescription: string;
  grade: number;
  evaluationDate: string;
  evaluatorRole: string;
  evaluatorId: number;
  teamId: number;
  studentId: number;
}

export interface EvaluationsData {
  isSuccess: boolean;
  evaluations: Evaluation[];
}

export interface EvaluationResponse {
  statusCode: number;
  message: string;
  data: EvaluationsData;
}
