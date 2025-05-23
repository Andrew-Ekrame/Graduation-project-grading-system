export interface ProjectResponse {
  statusCode: number;
  message: string;
  data: ProjectData;
}

export interface ProjectData {
  isSuccess: boolean;
  projectIdea: ProjectIdea;
}

export interface ProjectIdea {
  projectId: number;
  projectName: string;
  projectDescription: string;
  supervisorId: number;
  supervisorName: string;
  teamId: number;
  teamName: string;
  postedBy: 'Doctor' | 'Student';
}
