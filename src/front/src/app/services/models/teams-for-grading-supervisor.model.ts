export interface TeamMemberForGrading {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

export interface CriteriaSupervisor {
  id: number;
  name: string;
  description: string;
  maxGrade: number;
  evaluator: string;
  givenTo: string;
  specialty: string;
  year: number;
  term: string;
  createdAt: string;
}

export interface TeamForGradingSupervisor {
  teamId: number;
  teamName: string;
  projectId: string;
  projectName: string;
  projectDescription: string;
  scheduleId: number;
  scheduleDate: string;
  scheduleStatus: string;
  teamMembers: TeamMemberForGrading[];
}

export interface SpecialtyGroup {
  specialty: 'CS' | 'CS & STAT' | 'CS & MATH' | 'CS & PHYS';
  teams: TeamForGradingSupervisor[];
  criterias: CriteriaSupervisor[];
}

export interface TeamsForGradingSupervisorResponse {
  statusCode: number;
  message: string;
  data: {
    isSuccess: boolean;
    supervisorTeamsWithCriteriaBySpecialtyGroup: SpecialtyGroup[];
  };
}
