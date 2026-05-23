import { apiClient } from "@/services/apiClient";
import type { ApiResponse } from "@/types/api.types";
import type { ChangePasswordRequest } from "../types/change-password.types";



const handleApiError = (err: any): never => {
  const errData = err.response?.data;

  // 🔥 2. NETWORK ERROR
  if (!err.response) {
    throw new Error("Network error");
  }

  // 🔥 3. ARRAY ERROR (SƏNİN CASE)
  if (Array.isArray(errData)) {
    throw new Error(errData[0]?.message || "Validation error");
  }

  // 🔥 4. API RESPONSE ERROR
  if (errData?.errors && Array.isArray(errData.errors)) {
    throw new Error(errData.errors[0] || "Server error");
  }

  // 🔥 5. SINGLE MESSAGE
  if (errData?.message) {
    throw new Error(errData.message);
  }

  // 🔥 6. CUSTOM ERROR
  if (err instanceof Error) {
    throw err;
  }

  // 🔥 7. FALLBACK
  throw new Error("Naməlum bir səhv baş verdi");
};



export const changePassword = async (data: ChangePasswordRequest) => {
  try {
    await apiClient.post<ApiResponse<null>>(
      "/auth/change-password",
      data
    );
  } catch (err) {
    handleApiError(err);
  }
};