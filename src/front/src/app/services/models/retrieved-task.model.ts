export interface TaskResponse {
  statusCode: number;
  message: string;
  data: TaskData;
}

export interface TaskData {
  isSuccess: boolean;
  teamTasksWithTaskMembers: Task[];
}

export interface Task {
  id: number;
  name: string;
  description: string;
  deadline: string;
  startTime: string;  // Changed from startDate
  status: string;
  supervisorId: number;
  teamId: number;
  teamName: string;
  taskMembers: TeamMember[];  // Changed from teamMembers
}

export interface TeamMember {
  taskId: number;
  taskName: string;
  studentId: number;
  studentName: string;
  studentProfilePicture: string;
  teamId: number;
  teamName: string | null;  // Added null as possible value
  status: string;
}
