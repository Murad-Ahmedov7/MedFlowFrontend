import { apiClient } from "@/services/apiClient";
import type {ApiResponse} from "@/types/api.types";
import type {
  AuthTokens,
  SignInRequest,
  SignUpRequest,
  SignUpResponse,
} from "@/features/auth/types/auth.types";

// signUp (service)
//  ↓ throw
// useSignUp (hook)
//  ↓ keçir yuxarı (catch yoxdur)
// useSignUpForm (form hook)
//  ↓ catch edir ✅

export const signIn = async (data: SignInRequest) => {
  try {
    const res = await apiClient.post<ApiResponse<AuthTokens>>(
      "/auth/sign-in",
      data,
    );

    // 🔥 1. BUSINESS ERROR (200 olsa belə)
    if (!res.data.isSuccess) {
      console.log("➡️ BUSINESS ERROR işləyib");
      console.log("DETAIL:", res.data.errors);

      throw new Error(res.data.errors?.[0] || "Sign in failed");
    }

    console.log("✅ SUCCESS");
    return res.data.data;
  } catch (err: any) {
    // 🔥 2. ƏGƏR BU SƏNİN THROW ETDİYİN ERROR-DURSA → KEÇİR
    if (err) {
      console.log("➡️ CUSTOM ERROR işləyib");
      throw err;
    }

    const errData = err.response?.data;

    console.log("❌ RAW ERROR:", errData);
    console.log("❌ STATUS:", err.response?.status);

    // 🔥 3. REAL NETWORK ERROR (axios amma response yoxdur)
    if (!err.response) {
      console.log("➡️ NETWORK ERROR işləyib");
      throw new Error("Network error");
    }

    // 🔥 4. ARRAY ERROR
    if (Array.isArray(errData)) {
      console.log("➡️ ARRAY ERROR işləyib");
      console.log("DETAIL:", errData);

      throw new Error(errData[0]?.message || "Validation error");
    }

    // 🔥 5. API RESPONSE ERROR
    if (errData?.errors && Array.isArray(errData.errors)) {
      console.log("➡️ API RESPONSE ERROR işləyib");
      console.log("DETAIL:", errData.errors);

      throw new Error(errData.errors[0] || "Server error");
    }

    // 🔥 6. SINGLE MESSAGE
    if (errData?.message) {
      console.log("➡️ SINGLE MESSAGE ERROR işləyib");
      console.log("DETAIL:", errData.message);

      throw new Error(errData.message);
    }

    // 🔥 7. FALLBACK
    console.log("➡️ UNKNOWN ERROR işləyib");
    console.log("FULL ERROR:", err);

    throw err;
  }
};

export const signUp = async (data: SignUpRequest) => {
  try {
    const res = await apiClient.post<ApiResponse<SignUpResponse>>(
      "/auth/sign-up",
      data,
    );

    // 🔥 1. BUSINESS ERROR (200 olsa belə)
    if (!res.data.isSuccess) {
      console.log("➡️ BUSINESS ERROR işləyib");
      console.log("DETAIL:", res.data.errors);

      throw new Error(res.data.errors?.[0] || "Sign up failed");
    }

    console.log("✅ SUCCESS");
    return res.data.data;
  } catch (err: any) {
    const errData = err.response?.data;

    console.log("❌ RAW ERROR:", errData);
    console.log("❌ STATUS:", err.response?.status);

    // 🔥 2. NETWORK ERROR
    if (!err.response) {
      console.log("➡️ NETWORK ERROR işləyib");
      throw new Error("Network error");
    }

    // 🔥 3. ARRAY ERROR (SƏNİN CASE)
    if (Array.isArray(errData)) {
      console.log("➡️ ARRAY ERROR işləyib");
      console.log("DETAIL:", errData);

      throw new Error(errData[0]?.message || "Validation error");
    }

    // 🔥 4. API RESPONSE ERROR
    if (errData?.errors && Array.isArray(errData.errors)) {
      console.log("➡️ API RESPONSE ERROR işləyib");
      console.log("DETAIL:", errData.errors);

      throw new Error(errData.errors[0] || "Server error");
    }

    // 🔥 5. SINGLE MESSAGE
    if (errData?.message) {
      console.log("➡️ SINGLE MESSAGE ERROR işləyib");
      console.log("DETAIL:", errData.message);

      throw new Error(errData.message);
    }

    // 🔥 6. CUSTOM ERROR (sənin öz throw etdiyin)
    if (err instanceof Error) {
      console.log("➡️ CUSTOM ERROR işləyib");
      throw err;
    }

    // 🔥 7. FALLBACK
    console.log("➡️ UNKNOWN ERROR işləyib");
    console.log("FULL ERROR:", err);

    throw new Error("Naməlum bir səhv baş verdi");
  }
};

export const refreshRequest = async (refreshToken: string) => {
  const res = await apiClient.post<ApiResponse<AuthTokens>>(
    "/auth/refresh-token",
    { refreshToken },
  );
  return res.data.data;
};

 
//burada commentde olanlari da deyerlendir.

// export const signIn = async (data: SignInRequest) => {

// try {
//   const res = await apiClient.post<ApiResponse<AuthTokens>>(
//     "/auth/sign-in",
//     data
//   );

//   console.log("✅ SUCCESS");
//   return res.data.data;

//  }
//   catch (err: any) {
//   const data = err.response?.data;

//   console.log("❌ RAW ERROR:", data);
//   console.log("❌ STATUS:", err.response?.status);

//   // 🔥 1. array format
//   if (Array.isArray(data)) {
//     console.log("➡️ ARRAY ERROR işləyib");
//     console.log("DETAIL:", data);

//     throw new Error(data[0]?.message || "Validation error");
//   }

//   // 🔥 2. ApiResponse format
//   if (data?.errors && Array.isArray(data.errors)) {
//     console.log("➡️ API RESPONSE ERROR işləyib");
//     console.log("DETAIL:", data.errors);

//     throw new Error(data.errors[0] || "Server error");
//   }

//   // 🔥 3. tək message
//   if (data?.message) {
//     console.log("➡️ SINGLE MESSAGE ERROR işləyib");
//     console.log("DETAIL:", data.message);

//     throw new Error(data.message);
//   }

//   // 🔥 4. network / axios
//   if (!err.response) {
//     console.log("➡️ NETWORK ERROR işləyib");
//     console.log("DETAIL:", err.message);

//     throw new Error("Network error");
//   }

//   // 🔥 5. fallback
//   console.log("➡️ UNKNOWN ERROR işləyib");
//   console.log("FULL ERROR:", err);

//   throw new Error("Naməlum bir səhv baş verdi. Zəhmət olmasa yenidən cəhd edin.");
// }

// };

// export const signUp = async (data: SignUpRequest) => {
//   try {
//     const res = await apiClient.post<ApiResponse<SignUpResponse>>(
//       "/auth/sign-up",
//       data
//     );

//     return res.data.data;
//   } catch (error: any) {
//     const errData = error.response?.data;

//     console.log("RAW ERROR:", errData);

//     // 🔥 1. Array format (backend validation)
//     if (Array.isArray(errData)) {
//       return Promise.reject({
//         type: "validation",
//         messages: errData.map((e: any) => e.message),
//       });
//     }

//     // 🔥 2. Object format (ApiResponse)
//     if (errData?.errors) {
//       return Promise.reject({
//         type: "server",
//         messages: errData.errors,
//       });
//     }

//     // 🔥 3. Network error
//     if (!error.response) {
//       return Promise.reject({
//         type: "network",
//         messages: ["Network error"],
//       });
//     }

//     // 🔥 4. Unknown
//     return Promise.reject({
//       type: "unknown",
//       messages: ["Unexpected error"],
//     });
//   }
// };

// export const signUp = async (data: SignUpRequest) => {

// try {
//   const res = await apiClient.post<ApiResponse<SignUpResponse>>(
//     "/auth/sign-up",
//     data
//   );

//   console.log("✅ SUCCESS");
//   return res.data.data;

// } catch (err: any) {
//   const data = err.response?.data;

//   console.log("❌ RAW ERROR:", data);
//   console.log("❌ STATUS:", err.response?.status);

//   // 🔥 1. array format
//   if (Array.isArray(data)) {
//     console.log("➡️ ARRAY ERROR işləyib");
//     console.log("DETAIL:", data);

//     throw new Error(data[0]?.message || "Validation error");
//   }

//   // 🔥 2. ApiResponse format
//   if (data?.errors && Array.isArray(data.errors)) {
//     console.log("➡️ API RESPONSE ERROR işləyib");
//     console.log("DETAIL:", data.errors);

//     throw new Error(data.errors[0] || "Server error");
//   }

//   // 🔥 3. tək message
//   if (data?.message) {
//     console.log("➡️ SINGLE MESSAGE ERROR işləyib");
//     console.log("DETAIL:", data.message);

//     throw new Error(data.message);
//   }

//   // 🔥 4. network / axios
//   if (!err.response) {
//     console.log("➡️ NETWORK ERROR işləyib");
//     console.log("DETAIL:", err.message);

//     throw new Error("Network error");
//   }

//   // 🔥 5. fallback
//   console.log("➡️ UNKNOWN ERROR işləyib");
//   console.log("FULL ERROR:", err);

//   throw new Error("Naməlum bir səhv baş verdi. Zəhmət olmasa yenidən cəhd edin.");
// }

// };
