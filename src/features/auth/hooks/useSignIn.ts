// import { useState } from "react";
// import type { SignInRequest } from "../types/auth.types";
// import { signIn } from "../services/authService";
// import { tokenService } from "@/services/tokenService";

// export const useSignIn = () => {
//   const [loading, setLoading] = useState(false);

//   const handleSignIn = async (data: SignInRequest) => {
//     console.log("HOOK: 1. başladı");
//     try {
//       setLoading(true);
//       console.log("HOOK: 2. loading true");
//       const res = await signIn(data);
//       tokenService.setToken(res.token);
//       tokenService.setRefreshToken(res.refreshToken);
//       console.log("HOOK: 3. SUCCESS gəldi");
//       return res;
//     } finally {
//       console.log("HOOK: 4. finally → loading false");
//       setLoading(false);
//     }
//   };

//   return {
//     handleSignIn,
//     loading,
//   };
// };

import { useMutation } from "@tanstack/react-query";
import type { SignInRequest } from "../types/auth.types";
import { signIn } from "../services/authService";
import { tokenService } from "@/services/tokenService";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";

export const useSignIn = () => {
  const { setRole } = useAuth();
  // console.log("HOOK: 1. başladı");
  const mutation = useMutation({
    mutationFn: (data: SignInRequest) => signIn(data),

    onSuccess: (res) => {
      console.log("HOOK: 2. SUCCESS gəldi");
      tokenService.setToken(res.token);
      tokenService.setRefreshToken(res.refreshToken);

      try {
        const decoded: any = jwtDecode(res.token);

        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ]?.toLowerCase() ?? null;

        setRole(role); // 🔥 BU SƏNİN PROBLEMİNİ HƏLL EDİR
      } catch {
        setRole(null);
      }
    },
  });

  return {
    handleSignIn: mutation.mutateAsync, // 🔥 əsas dəyişiklik
    loading: mutation.isPending,
    error: mutation.error,
  };
};
