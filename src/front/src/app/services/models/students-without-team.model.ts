export interface Student {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

export interface StudentsData {
  isSuccess: boolean;
  students: Student[];
}

export interface StudentsWithoutTeamResponse {
  statusCode: number;
  message: string;
  data: StudentsData;
}
