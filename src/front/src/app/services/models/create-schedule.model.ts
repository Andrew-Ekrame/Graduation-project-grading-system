export interface TeamForSchedule {
  id: number;
  name: string;
  hasProject: boolean;
  leaderId: number;
  leaderName: string;
  supervisorId: number;
  supervisorName: string;
}

export interface TeamsData {
  isSuccess: boolean;
  teams: TeamForSchedule[];
}

export interface TeamsForScheduleResponse {
  statusCode: number;
  message: string;
  data: TeamsData;
}
