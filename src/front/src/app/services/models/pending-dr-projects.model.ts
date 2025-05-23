export interface PendingDrProjectsResponse {
  statusCode: number;
  message: string;
  data: PendingDrProjectsData;
}

export interface PendingDrProjectsData {
  isSuccess: boolean;
  pendingDoctorProjects: PendingDoctorProject[];
}

export interface PendingDoctorProject {
  id: number;
  name: string;
  description: string;
  submissionDate: string;
  status: string;
  doctorId: number;
  doctorName: string;
}