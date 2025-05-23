export interface PendingProjectFromTeam {
  id: number;
  name: string;
  description: string;
  submissionDate: string;
  status: string;
  teamId: number;
  teamName: string;
  leaderId: number;
  leaderName: string;
  supervisorId: number | null;
  supervisorName: string | null;
}

export interface PendingProjectsFromTeamsData {
  isSuccess: boolean;
  pendingTeamProjects: PendingProjectFromTeam[];
}

export interface PendingProjectsFromTeamsResponse {
  statusCode: number;
  message: string;
  data: PendingProjectsFromTeamsData;
}
