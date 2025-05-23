export interface ResetPasswordRes {
  statusCode: number;
  message: string;
  data: null;
}
export interface ResetPasswordReq {
  newPassword: string | null;
  confirmPassword: string | null;
  email: string;
  token: string;
}
