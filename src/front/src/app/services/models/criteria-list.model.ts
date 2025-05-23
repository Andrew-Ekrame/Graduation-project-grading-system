export interface CriteriaListResponse {
  statusCode: number;
  message: string;
  data: CriteriaListData;
}

export interface CriteriaListData {
  isSuccess: boolean;
  criteriaList: Criteria[];
}

export interface Criteria {
  id: number;
  name: string;
  description: string;
  maxGrade: number;
  evaluator: 'Examiner' | 'Supervisor' | 'Admin';
  givenTo: 'Team' | 'Student';
  specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS';
  year: string;
  term: 'First-Term' | 'Second-Term';
  isActive: boolean;
  createdAt: Date;
  lastUpdatedAt: Date;
}
