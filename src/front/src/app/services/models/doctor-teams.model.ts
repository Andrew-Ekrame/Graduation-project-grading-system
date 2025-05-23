export interface DoctorTeams {
  statusCode: number;
  message: string;
  data: TeamsData;
}

export interface TeamsData {
  isSuccess: boolean;
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
  hasProject: boolean;
  leaderId: number;
  supervisorId: number;
  specilaity?: 'CS' | 'CS & MATH' | 'CS & STAT' | 'CS & PHYS';
  members: TeamMember[];
}

export interface TeamMember {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

// export const MOCK_DOCTOR_TEAMS: DoctorTeams = {
//   statusCode: 200,
//   message: 'Teams retrieved successfully',
//   data: {
//     isSuccess: true,
//     teams: [
//       {
//         id: 1,
//         name: 'Team Alpha',
//         hasProject: true,
//         leaderId: 101,
//         supervisorId: 201,
//         members: [
//           {
//             id: 101,
//             fullName: 'John Smith',
//             email: 'john.smith@university.edu',
//             specialty: 'Frontend Development',
//             inTeam: true,
//             profilePicture: 'images/profile1.jpg',
//           },
//           {
//             id: 102,
//             fullName: 'Sarah Johnson',
//             email: 'sarah.j@university.edu',
//             specialty: 'Backend Development',
//             inTeam: true,
//             profilePicture: 'images/profile2.jpg',
//           },
//           {
//             id: 103,
//             fullName: 'Mike Wilson',
//             email: 'mike.w@university.edu',
//             specialty: 'UI/UX Design',
//             inTeam: true,
//             profilePicture: 'images/profile3.jpg',
//           },
//         ],
//       },
//       {
//         id: 2,
//         name: 'Team Beta',
//         hasProject: true,
//         leaderId: 104,
//         supervisorId: 202,
//         members: [
//           {
//             id: 104,
//             fullName: 'Emily Brown',
//             email: 'emily.b@university.edu',
//             specialty: 'Mobile Development',
//             inTeam: true,
//             profilePicture: 'images/profile4.jpg',
//           },
//           {
//             id: 105,
//             fullName: 'David Lee',
//             email: 'david.l@university.edu',
//             specialty: 'Database Design',
//             inTeam: true,
//             profilePicture: 'images/profile5.jpg',
//           },
//         ],
//       },
//       {
//         id: 3,
//         name: 'Team Gamma',
//         hasProject: false,
//         leaderId: 106,
//         supervisorId: 203,
//         members: [
//           {
//             id: 106,
//             fullName: 'Lisa Anderson',
//             email: 'lisa.a@university.edu',
//             specialty: 'System Architecture',
//             inTeam: true,
//             profilePicture: 'images/profile1.jpg',
//           },
//           {
//             id: 107,
//             fullName: 'Tom Parker',
//             email: 'tom.p@university.edu',
//             specialty: 'DevOps',
//             inTeam: true,
//             profilePicture: 'images/profile2.jpg',
//           },
//           {
//             id: 108,
//             fullName: 'Anna Martinez',
//             email: 'anna.m@university.edu',
//             specialty: 'Quality Assurance',
//             inTeam: true,
//             profilePicture: 'images/profile3.jpg',
//           },
//           {
//             id: 109,
//             fullName: 'Kevin Chen',
//             email: 'kevin.c@university.edu',
//             specialty: 'Security',
//             inTeam: true,
//             profilePicture: 'images/profile4.jpg',
//           },
//         ],
//       },
//     ],
//   },
// };
