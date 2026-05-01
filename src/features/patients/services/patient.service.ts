import { apiClient } from "@/services/apiClient";
import type {
  CreatePatientRequest,
  CreatePatientResponse,
} from "../types/patient.types";
import type { ApiResponse } from "@/types/api.types";

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

export const createPatient = async (data: CreatePatientRequest) => {
  try {
    const res = await apiClient.post<ApiResponse<CreatePatientResponse>>(
      "/patients",
      data,
    );

    if (!res.data.isSuccess) {
      throw new Error(res.data.errors?.[0] || "Create Patient failed");
    }

    return res.data.data;
  } catch (err) {
    handleApiError(err);
  }
};

