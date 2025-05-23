export interface TeamMember {
  id: number;
  fullName: string;
  email: string;
  specialty: string;
  inTeam: boolean;
  profilePicture: string;
}

export interface TeamInvitation {
  invitationId: number;
  teamId: number;
  teamName: string;
  leaderId: number;
  leaderName: string;
  studentId: number;
  studentName: string;
  invitationSentDate: string;
  invitationStatus: 'Pending' | 'Accepted' | 'Rejected';
  teamMembers: TeamMember[];
}

export interface InvitationsData {
  isSuccess: boolean;
  invitations: TeamInvitation[];
}

export interface InvitationsResponse {
  statusCode: number;
  message: string;
  data: InvitationsData;
}
// const invites = [
//   {
//     inviteId: 1,
//     teamName: 'Team Alpha',
//     teamId: 1,
//     students: [
//       { name: 'Alice', image: 'images/profile1.jpg' },
//       { name: 'Bob', image: 'images/profile2.jpg' },
//     ],
//     leader: 'Alice',
//   },
//   {
//     inviteId: 2,
//     teamName: 'Team Beta',
//     teamId: 2,
//     students: [{ name: 'Charlie', image: 'images/profile3.jpg' }],
//     leader: 'Charlie',
//   },
//   {
//     inviteId: 3,
//     teamName: 'Team Gamma',
//     teamId: 3,
//     students: [
//       { name: 'Eve', image: 'images/profile5.jpg' },
//       { name: 'Frank', image: 'images/profile1.jpg' },
//       { name: 'Grace', image: 'images/profile2.jpg' },
//     ],
//     leader: 'Eve',
//   },
//   {
//     inviteId: 4,
//     teamName: 'Team Delta',
//     teamId: 4,
//     students: [
//       { name: 'Hank', image: 'images/profile3.jpg' },
//       { name: 'Ivy', image: 'images/profile4.jpg' },
//     ],
//     leader: 'Hank',
//   },
//   {
//     inviteId: 5,
//     teamName: 'Team Epsilon',
//     teamId: 5,
//     students: [
//       { name: 'Jack', image: 'images/profile5.jpg' },
//       { name: 'Kate', image: 'images/profile1.jpg' },
//     ],
//     leader: 'Jack',
//   },
// ];
