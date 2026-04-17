import { apiClient } from "./apiClient";
import { authManager } from "./authManager";
import { tokenService } from "./tokenService";

// 🔹 REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {

    const token = tokenService.getToken();
    console.log("🟡 REQUEST BAŞLADI");
    console.log("➡️ URL:", config.url);
    console.log("➡️ METHOD:", config.method);
    console.log("➡️ DATA:", config.data);
    console.log("➡️ TOKEN:", token);

    // varsa əlavə et
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("🔐 Authorization əlavə olundu");
    } else {
      console.log("⚠️ TOKEN YOXDUR");
    }

    console.log("🟡 REQUEST GÖNDƏRİLİR");
    return config;
  },
  (error) => {
    console.log("❌ REQUEST ERROR:", error);
    return Promise.reject(error);
  },
);

// 🔹 RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => {
    console.log("🟢 RESPONSE INTERCEPTOR işləyib");
    console.log("STATUS:", response.status);
    console.log("DATA:", response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    console.log("🔴 RESPONSE ERROR");
    console.log("⬅️ URL:", originalRequest?.url);
    console.log("⬅️ STATUS:", error.response?.status);
    console.log("⬅️ DATA:", error.response?.data);

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      tokenService.getRefreshToken()
    ) {
      console.log("♻️ TOKEN REFRESH BAŞLADI");
      originalRequest._retry = true;

      try {
        const newToken = await authManager.refresh();

        console.log("✅ YENİ TOKEN ALINDI:", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        console.log("🔁 REQUEST YENİDƏN GÖNDƏRİLİR");

        return apiClient(originalRequest);
      } catch (err) {
        console.log("❌ REFRESH UĞURSUZ");

        authManager.logout();
        return Promise.reject(err);
      }
    }

    // Timeout error
    if (error.code === "ECONNABORTED") {
      console.log("Server cavab vermədi (timeout)");
    }

    return Promise.reject(error);
  },
);


//interceptor tekce 401 yox 403 ve s digelri ile de et

// 1. Request interceptor  → request getməmişdən əvvəl
// 2. Response interceptor → cavab gələndən sonra

// Interceptor-un məqsədi — bütün request və response-ları mərkəzləşdirilmiş şəkildə idarə etməkdir.

//Inteceptor kodunu basa dus.


// Interceptor → ümumi (global) error-lar
// Service → endpoint-ə xüsusi (business) error-lar

//bu interceptor modern deyil deyis(global middleware et)

//ve sorgularda olan try catchler ile bir birlesdir


//then catch ile try catch ferqi ve burda yaz

//ve butun errolar hallarini backenden gotur






// 🔹 1️⃣ ACCESS TOKEN (60 dəqiqə)

// 👉 Nədir: API üçün icazə
// 👉 Bitəndə:

// 401 gəlir
// refresh işə düşür

// 👉 Nəticə:
// ✔ problem deyil, avtomatik yenilənir

// 🔹 2️⃣ REFRESH TOKEN (7 gün – sliding)

// 👉 Nədir: yeni access almaq üçün
// 👉 Nə vaxt bitir:

// ✔ A) 7 gün istifadə etməsən

// ➡️ expire olur ❌

// ✔ B) istifadə edirsənsə

// ➡️ hər refresh-də yenilənir ✔

// 👉 Nəticə:
// ✔ aktiv user → bitmir
// ❌ passiv user → 7 günə logout

// 🔹 3️⃣ ABSOLUTE EXPIRY (30 gün – hard limit)

// 👉 Nədir: maksimum session müddəti

// 👉 Nə vaxt bitir:

// 30 gün tamam olanda ❌
// fərqi yoxdur refresh olub ya yox

// ✔ SÜBUT (sənin koddan)
// _sqlUnitOfWork.AuthRepository.Delete(tokenResult); // köhnə silinir

// var accessToken = _tokenProvider.GenerateAccessToken(...);
// var refreshToken = _tokenProvider.GenerateRefreshToken();

// _sqlUnitOfWork.AuthRepository.Add(new RefreshToken { ... });
// ✔ NƏ DEMƏKDİR BU?

// 👉 Hər refresh zamanı:

// refresh_OLD ❌ silinir
// ↓
// access_NEW ✔ yaradılır
// refresh_NEW ✔ yaradılır
// ✔ DEMƏLİ
// Token	Nə olur
// Access token	✔ həmişə yenilənir
// Refresh token	✔ həmişə yenilənir
// Köhnə refresh	❌ silinir

//TOKEN GELECEKDE DAHA YAXSI ET

// ✔ STEP 4 — logout (missing idi)
// export const logout = () => {
// tokenService.clear();
// };

// src/services/interceptors.ts

// import { apiClient } from "./apiClient";
// import { tokenService } from "./tokenService";
// import { refreshToken } from "@/features/auth/services/authService";

// let isRefreshing = false;
// let failedQueue: any[] = [];

// const processQueue = (error: any, token: string | null = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });

//   failedQueue = [];
// };

// // 🔹 REQUEST
// apiClient.interceptors.request.use((config) => {
//   const token = tokenService.getToken();

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// // 🔹 RESPONSE
// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // yalnız 401 və retry olunmayıbsa
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         })
//           .then((token) => {
//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return apiClient(originalRequest);
//           })
//           .catch((err) => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const refresh = tokenService.getRefreshToken();

//         if (!refresh) {
//           throw new Error("No refresh token");
//         }

//         const newTokens = await refreshToken(refresh);

//         tokenService.setToken(newTokens.token);
//         tokenService.setRefreshToken(newTokens.refreshToken);

//         processQueue(null, newTokens.token);

//         originalRequest.headers.Authorization = `Bearer ${newTokens.token}`;

//         return apiClient(originalRequest);
//       } catch (err) {
//         processQueue(err, null);
//         tokenService.clear();

//         return Promise.reject(err);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
//);
