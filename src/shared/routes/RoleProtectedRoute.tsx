import { useAuth } from "@/features/auth/context/AuthContext";
import { Navigate } from "react-router-dom";

interface Props {
  roles: string[];
  children: React.ReactNode;
}

export default function RoleProtectedRoute({ roles, children }: Props) {
  const { role } = useAuth();

  if (role === null) return <div>Loading...</div>;
  // role uyğun deyil → 403
  if (!roles.includes(role)) {
    return <Navigate to="/forbidden" />;
  }

  return <>{children}</>;
}

//niye loading signUp ucun lazim oldu ama departmentde normal isledi.

// Department səhifəsində role artıq login zamanı setRole ilə dolduğu üçün problem görünmürdü.

// Amma CreateUser səhifəsi refresh və ya birbaşa açıldıqda role ilk render-də null olurdu.

// Ona görə loading lazım idi ki, role decode olunana qədər route check işləməsin.



