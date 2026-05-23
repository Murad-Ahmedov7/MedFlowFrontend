
import { createContext, useContext } from "react";

interface AuthState {
  role: string | null;
  email: string | null;

  setRole: (
    role: string | null,
  ) => void;

  setEmail: (
    email: string | null,
  ) => void;
}
export const AuthContext = createContext<AuthState | null>(null);


export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
};

