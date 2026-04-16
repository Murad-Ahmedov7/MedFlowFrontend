import { useState } from "react";
import type { SignInRequest } from "../types/auth.types";
import { signIn } from "../services/authService";
import { tokenService } from "@/services/tokenService";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (data: SignInRequest) => {
    console.log("HOOK: 1. başladı");
    try {
      setLoading(true);
      console.log("HOOK: 2. loading true");
      const res = await signIn(data);
      tokenService.setToken(res.token);
      tokenService.setRefreshToken(res.refreshToken);
      console.log("HOOK: 3. SUCCESS gəldi");
      return res;
    } finally {
      console.log("HOOK: 4. finally → loading false");
      setLoading(false);
    }
  };

  return {
    handleSignIn,
    loading,
  };
};
