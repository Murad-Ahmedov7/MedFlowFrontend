interface StaffBaseRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}


export interface CreateDoctorRequest extends StaffBaseRequest {
  departmentId: string;
  specialty: string;
  imageUrl?: string;
}

export interface CreateStaffResponse {
  id: string;
}

export interface CreateReceptionistRequest extends StaffBaseRequest {}


