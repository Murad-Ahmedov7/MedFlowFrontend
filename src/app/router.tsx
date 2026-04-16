import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import SignInPage from "@/pages/auth/sign-in/SignInPage";
import SignUpPage from "@/pages/auth/sign-up/SignUpPage";


// import MainLayout from "../layouts/MainLayout";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element:<HomePage/>
//       },
//     ],
//   },
//   // {
//   //   path: "*",
//   //   element: <NotFoundPage />,
//   // },
// ]);

//yuxaridaki commnet yeni notfound page yaz ve index true var nezerinde olsun.Ve MainLayout-a ne edim?

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children : [
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/auth/sign-in" />,
  },
]);


//outletin isleme mentiqine bax

// 👉 Router əvvəl uyğun route-ları tapır, sonra child komponentləri Outlet vasitəsilə yerləşdirir

// ✔ Outlet üçün əsas qayda

// 👉 Əgər route-un children-ı varsa → həmin route-un componentində Outlet MÜTLƏQDİR

// ✔ Sənin case qaydaya tətbiq
// {
//   path: "/auth",
//   element: <AuthLayout />,   // ← burada Outlet olmalıdır
//   children: [...]
// }

// ✔ → AuthLayout içində <Outlet /> olmalıdır

// ❗ Əgər children yoxdursa
// {
//   path: "/about",
//   element: <AboutPage />,
// }

// → ❌ Outlet lazım deyil
