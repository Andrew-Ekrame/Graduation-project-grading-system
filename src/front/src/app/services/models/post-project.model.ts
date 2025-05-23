export interface PostProjectReq {
  name: string;
  description: string;
}
export interface PostProjectTeamReq {
  name: string;
  description: string;
  teamId: number;
}
export interface PostProjectRes {
  statusCode: number;
  message: string;
}
