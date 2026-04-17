

// 🔐 3. ProtectedLayout (401)
import { tokenService } from "@/services/tokenService";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  const token = tokenService.getToken();

  if (!token) {
    return <Navigate to="/auth/sign-in"/>;
  }
  return <Outlet />;
 }


