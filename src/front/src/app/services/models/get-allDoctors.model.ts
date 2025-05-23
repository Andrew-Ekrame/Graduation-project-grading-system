export interface Doctor {
  doctorId: number;
  doctorName: string;
}

export interface DoctorsData {
  isSuccess: boolean;
  doctorsList: Doctor[];
}

export interface DoctorsResponse {
  statusCode: number;
  message: string;
  data: DoctorsData;
}
