import { apiClient } from "@/services/apiClient";
import type {
  AddDepartmentRequest,
  DepartmentResponse,
  UpdateDepartmentRequest,
} from "../types/department.types";
import type { ApiResponse, PaginatedResponse } from "@/types/api.types";

export const addDepartment = async (data: AddDepartmentRequest) => {
  try {
    const res = await apiClient.post<ApiResponse<DepartmentResponse>>(
      "/departments",
      data,
    );

    // 🔥 1. BUSINESS ERROR (200 olsa belə)
    if (!res.data.isSuccess) {
      throw new Error(res.data.errors?.[0] || "Add Department failed");
    }
    return res.data.data;
  } catch (err: any) {
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

    // 🔥 6. CUSTOM ERROR (sənin öz throw etdiyin)
    if (err instanceof Error) {
      throw err;
    }

    // 🔥 7. FALLBACK
    throw new Error("Naməlum bir səhv baş verdi");
  }
};

export const updateDepartment = async (
  id: string,
  data: UpdateDepartmentRequest,
) => {
  try {
    const res = await apiClient.put<ApiResponse<DepartmentResponse>>(
      `/departments/${id}`,
      data,
    );

    if (!res.data.isSuccess) {
      throw new Error(res.data.errors?.[0] || "Update Department failed");
    }
    return res.data.data;
  } catch (err: any) {
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

    // 🔥 6. CUSTOM ERROR (sənin öz throw etdiyin)
    if (err instanceof Error) {
      throw err;
    }

    // 🔥 7. FALLBACK
    throw new Error("Naməlum bir səhv baş verdi");
  }
};

export const getDepartment = async (id: string) => {
  const res = await apiClient.get<ApiResponse<DepartmentResponse>>(
    `/departments/${id}`,
  );
  return res.data.data;
};



export const getDepartments = async () => {
  const res =
    await apiClient.get<PaginatedResponse<DepartmentResponse>>("/departments");
  return res.data.data;
};

export const deleteDepartment = async (id: string) => {
  await apiClient.delete<ApiResponse<DepartmentResponse>>(`/departments/${id}`);
};



