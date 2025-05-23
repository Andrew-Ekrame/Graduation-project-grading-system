export interface TeamMember {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

export interface Team {
  id: number;
  name: string;
  hasProject: boolean;
  leaderId: number;
  supervisorId: number;
  members: TeamMember[];
}

export interface TeamDataResponse {
  isSuccess: boolean;
  team: Team;
}

export interface TeamData {
  statusCode: number;
  message: string;
  data: TeamDataResponse;
}
