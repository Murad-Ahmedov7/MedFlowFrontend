import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout";
import SignInPage from "@/pages/auth/sign-in/SignInPage";
import SignUpPage from "@/pages/auth/sign-up/SignUpPage";
import MainLayout from "@/layouts/MainLayout";
import DepartmentsPage from "@/pages/departments/DepartmentsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedLayout from "@/layouts/ProtectedLayout";
import ForbiddenPage from "@/pages/ForbiddenPage";
import UpdateDepartmentPage from "@/pages/departments/edit/UpdateDepartmentPage";
import AddDepartmentPage from "@/pages/departments/new/AddDepartmentPage";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [{ path: "sign-in", element: <SignInPage /> }],
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

          {
            path: "/departments",
            children: [
              { index: true, element: <DepartmentsPage /> },
              { path: "new", element: <AddDepartmentPage /> },
              { path: "edit/:id", element: <UpdateDepartmentPage /> },
            ],
          },

          {
            path: "/auth",
            children: [{ path: "sign-up", element: <SignUpPage /> }],
          },
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




// /auth → normalda public zone

// 👉 sən isə:

// /auth/sign-up → protected etmisən

// 👉 bu qarışıqdır




// ❗ Problem 1 — /auth iki dəfə istifadə olunur
// // public
// {
//   path: "/auth",
//   element: <AuthLayout />,
// }

// // protected
// {
//   path: "/auth",
//   children: [{ path: "sign-up", ... }],
// }

// 👉 Problem:

// eyni path → 2 fərqli zone (public + protected) ❌

// Niyə vacibdir:

// routing davranışı qarışır
// debug çətinləşir
// role əlavə edəndə partlayacaq



// ❗ Problem 2 — absolute path istifadəsi
// path: "/departments"
// path: "/auth"

// 👉 nested route içində / yazmaq:

// parent-i bypass edir ❌

//ne etmeliyem bu halda?


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
