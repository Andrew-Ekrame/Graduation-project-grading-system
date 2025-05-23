export interface Student {
  name: string;
  image: string;
}
export interface Invite {
  inviteId: number;
  teamName: string;
  teamId: number;
  students: Student[];
  leader: string;
}
