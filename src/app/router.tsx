import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import SignInPage from "@/pages/auth/sign-in/SignInPage";
import SignUpPage from "@/pages/auth/sign-up/SignUpPage";
import MainLayout from "@/layouts/MainLayout";
import DepartmentsPage from "@/pages/DepartmentsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import ForbiddenPage from "@/pages/ForbiddenPage";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "sign-in", element: <SignInPage /> },
      { path: "sign-up", element: <SignUpPage /> },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/auth/sign-in" />,
  },



  {
    element: <ProtectedLayout />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/departments" /> },
          { path: "/departments", element: <DepartmentsPage /> },
        ],
      },
    ],
  },

    // ⛔ FORBIDDEN (403)
  {
    path: "/forbidden",
    element: <ForbiddenPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);



// 🎯 NƏTİCƏ

// 👉 Sənin düşündüyün:

// 401 / 403 / 404 → ✔ DOĞRU (backend baxışı)

// 👉 Amma frontend-də düzgün mapping:

// token yox → login redirect ✔
// icazə yox → forbidden ✔
// səhv route → not found ✔

//403 forbidden de mesn birdewn doctor bilmeden admin acces oldugu yere girmek istede de 403 alsin

// Unexpected Application Error!
// 404 Not Found
// 💿 Hey developer 👋


// You can provide a way better UX than this when your app throws errors by providing your own ErrorBoundary or errorElement prop on your route.



//Navigate,navibagte Link a link ferqi\


//sidebarda home yaz ?



// ❗ BURADA ƏSAS MƏQAM

// 👉 “Layout” React Router-da yalnız UI demək deyil

// 👉 Layout = route-u bürüyən və idarə edən komponent

// 🔹 UI Layout
// Header + Sidebar + Footer + Outlet

// 👉 görünüş verir

// 🔹 Logic Layout
// if (!token) return <Navigate />
// return <Outlet />

// 👉 qayda tətbiq edir




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
