
import { createContext, useContext } from "react";

interface AuthState {
  role: string | null;
  setRole: (role: string | null) => void; // 🔥 əlavə et
}

export const AuthContext = createContext<AuthState | null>(null);


export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};

