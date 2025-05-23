export interface MyCriteriaResponse {
  statusCode: number;
  message: string;
  data: MyCriteriaData;
}

export interface MyCriteriaData {
  isSuccess: boolean;
  criteriaList: MyCriteria[];
}

export interface MyCriteria {
  id: number;
  name: string;
  description: string;
  maxGrade: number;
  evaluator: 'Examiner' | 'Supervisor' | 'Admin';
  givenTo: 'Team' | 'Student';
  specialty: string;
  year: string;
  term: string;
  isActive: boolean;
  createdAt: string;
  lastUpdatedAt: string | null;
}
