export interface TeamMemberInSchedule {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

export interface ExaminerScheduleData {
  examinerId: number;
  examinerName: string;
}

export interface TeamScheduleData {
  scheduleId: number;
  status: string;
  scheduleDate: string;
  teamId: number;
  teamName: string;
  projectName: string;
  projectDescription: string;
  postedBy: string;
  supervisorName: string;
  teamMembers: TeamMemberInSchedule[];
  teamLeaderId?: number;
  teamLeaderName?: string;
  specialty?: string;
  projectId?: number;
  doctorRole?: string;
  supervisorId?: number;
  examiners?: ExaminerScheduleData[];
}
export interface AllSchedulesResponseDataDoctor {
  isSuccess: boolean;
  schedules: TeamScheduleData[];
}

export interface AllSchedulesResponse {
  statusCode: number;
  message: string;
  data: AllSchedulesResponseDataDoctor;
}
