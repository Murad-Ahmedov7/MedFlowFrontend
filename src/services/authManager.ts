

import { refreshRequest, signIn as signInRequest } from "../features/auth/services/authService";
import { tokenService } from "@/services/tokenService";
import type { SignInRequest } from "../features/auth/types/auth.types";

export const authManager = {
  async signIn(data: SignInRequest) {
    const tokens = await signInRequest(data);

    tokenService.setToken(tokens.token);
    tokenService.setRefreshToken(tokens.refreshToken);
    return tokens;
  },

async refresh() {
  const refreshToken = tokenService.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const tokens = await refreshRequest(refreshToken);

  tokenService.setToken(tokens.token);
  tokenService.setRefreshToken(tokens.refreshToken);

  return tokens.token;
},

  logout() {
    tokenService.clear();
  },
};


//Tokenlerin islemesini bir de yoxla.


// ✔ NƏYİ YOXLAYIR BACKEND?

// Sən göndərirsən:

// POST /auth/refresh
// {
//   refreshToken: "abc123"
// }

// Backend DB-də baxır:

// Bu token:
// - mövcuddur? ✔
// - silinməyib? ✔
// - 7 gün keçməyib? ✔
// - 30 gün keçməyib? ✔
// - hansı user-ə aiddir? ✔

// 👉 bunları bilmədən:

// yeni token vermək OLMAZ ❌


