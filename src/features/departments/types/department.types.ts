export interface AddDepartmentRequest {
  name: string;
  imageUrl?: string | null;
}


export interface UpdateDepartmentRequest {
  name: string;
  imageUrl?: string | null;
}

export interface DepartmentResponse {
  id: string;
  name: string;
  imageUrl?: string | null;
  createdAt: string;
}
