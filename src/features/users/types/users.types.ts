interface UserBaseRequest {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}


export interface CreateDoctorRequest extends UserBaseRequest {
  departmentId: string;
  specialty: string;
  imageUrl?: string;
}

export interface CreateReceptionistRequest extends UserBaseRequest {}


export interface CreateUserResponse {
  id: string;
}



