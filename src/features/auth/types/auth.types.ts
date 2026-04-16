
export interface SignUpRequest {
  fullName: string;
  email: string;
  phone: string;
  userRole: string;
  password: string;
  confirmPassword: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpResponse {
  id: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}

