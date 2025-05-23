export interface AdminTeamsResponse {
  statusCode: number;
  message: string;
  data: {
    isSuccess: boolean;
    teamsWithCriteriaBySpecialtyGroup: SpecialtyGroupAdmin[];
  };
}

export interface SpecialtyGroupAdmin {
  specialty: string;
  criterias: CriteriaAdmin[];
  teams: TeamAdmin[];
}

export interface CriteriaAdmin {
  id: number;
  name: string;
  description: string;
  maxGrade: number;
  evaluator: string;
  givenTo: string;
  specialty: string;
  year: string;
  term: string;
  createdAt: string;
}

export interface TeamAdmin {
  teamId: number;
  teamName: string;
  projectId: number;
  projectName: string;
  projectDescription: string;
  scheduleId: number;
  scheduleDate: string;
  scheduleStatus: string;
  specialty?: string;
  criterias: CriteriaAdmin[];
  teamMembers: TeamMemberAdmin[];
}

export interface TeamMemberAdmin {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}
