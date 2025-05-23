export interface UserObjectModel {
  data: UserProfileData;
  statusCode: number;
  message: string;
}
export interface UserProfileData {
  id: number;
  fullName: string;
  email: string;
  role: string;
  profilePicture: string;
  teamId?: number;
  leaderOfTeamId?: number; //if found then student is leader
  inTeam?: boolean;
  hasProject: boolean;
  specialty: 'CS' | 'CS & MATH' | 'CS & STAT' | 'CS & PHYS';
  currentAcademicSemester: 'First-Term' | 'Second-Term';
  currentAcademicYear: string;
}
