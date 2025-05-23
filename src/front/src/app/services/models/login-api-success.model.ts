export interface LoginApiSuccess {
  statusCode: number;
  message: string;
  data: {
    token: string | null;
  };
}
