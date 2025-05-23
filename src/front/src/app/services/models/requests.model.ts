//pending requests
export interface Requests {
  statusCode: number;
  message: string;
  data: RequestData;
}
export interface RequestData {
  isSuccess: boolean;
  pendingTeamRequests: PendingTeamRequest[];
}
export interface PendingTeamRequest {
  requestId: number;
  status: string;
  requestedDate: string;
  teamId: number;
  teamName: string;
  leaderId: number;
  leaderName: string;
  doctorId: number;
  doctorName: string;
  doctorProjectIdeaId: number;
  doctorProjectIdeaName: string;
  teamMembers: Member[];
}
export interface Member {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

//doctor's projects
export interface AcceptedProject {
  id: number;
  name: string;
  description: string;
  submissionDate: string;
  status: string;
  doctorId: number;
  doctorName: string;
}

// Mock data for testing purposes
const mockMembers: Member[] = [
  {
    id: 11,
    fullName: 'Ahmed Test 2',
    email: 'a3@gm.com',
    specialty: 'CS & MATH',
    inTeam: true,
    profilePicture:
      'https://grading-system-app.runasp.net/Students/ProfilePictures/b50db708-5f00-481f-a689-4cde4bd5fb80_#2.png',
  },
  {
    id: 14,
    fullName: 'Ahmed Test 6',
    email: 'ar6@gm.com',
    specialty: 'CS & MATH',
    inTeam: true,
    profilePicture:
      'https://grading-system-app.runasp.net/Students/ProfilePictures/c01c7561-ce18-4a89-b97a-94a16a1ccb2c_#1.png',
  },
];

export const mockPendingTeamRequests: PendingTeamRequest[] = [
  {
    requestId: 9,
    status: 'Pending',
    requestedDate: '2025-04-29T08:45:29.0918988',
    teamId: 24,
    teamName: 'Math Team Test',
    leaderId: 11,
    leaderName: 'Ahmed Test 2',
    doctorId: 1,
    doctorName: 'Dr Ahmed',
    doctorProjectIdeaId: 1,
    doctorProjectIdeaName: 'Blogs',
    teamMembers: mockMembers,
  },
];

export const mockRequestsResponse: Requests = {
  statusCode: 200,
  message:
    "Pending team requests for project ideas belong to his doctor: 'Dr Ahmed' retrieved successfully.",
  data: {
    isSuccess: true,
    pendingTeamRequests: mockPendingTeamRequests,
  },
};

export const mockAcceptedProjects: AcceptedProject[] = [
  {
    id: 301,
    name: 'AI Health Monitor',
    description: 'A health monitoring system using artificial intelligence',
    submissionDate: '2025-04-17',
    status: 'In Progress',
    doctorId: 201,
    doctorName: 'Dr. Williams',
  },
  {
    id: 302,
    name: 'Smart Learning Platform',
    description: 'An intelligent learning management system',
    submissionDate: '2025-04-16',
    status: 'In Progress',
    doctorId: 202,
    doctorName: 'Dr. Johnson',
  },
];
