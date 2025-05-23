export interface AcademicYearAppointment {
  id: number;
  year: string;
  firstTermStart: string;
  firstTermEnd: string;
  secondTermStart: string;
  secondTermEnd: string;
  status: 'Active' | 'Inactive';
}

export interface AcademicAppointmentData {
  isSuccess: boolean;
  academicYearAppointments: AcademicYearAppointment[];
}

export interface AcademicAppointmentResponse {
  statusCode: number;
  message: string;
  data: AcademicAppointmentData;
}
