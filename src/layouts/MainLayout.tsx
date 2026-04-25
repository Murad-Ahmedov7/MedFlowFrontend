import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { Navbar } from "@/components/Navbar";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden  ">
      {/* Sidebar */}
      <SideBar />

      {/* Right side */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar />


        {location.pathname == "/auth/sign-up" ? (
          <div className="relative h-screen  flex items-center justify-center bg-gradient-to-r from-cyan-400 to-white">
            
            {/* Overlay yalnız burda işləyəcək */}
            <div className="absolute inset-0 bg-black/30 z-10"></div>

            {/* Content */}
            <div className="relative z-20 w-[90%] max-w-4xl bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl">
              <Outlet />
            </div>

          </div>
        ) : (
          <main className="  p-10 bg-gray-300/40">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  );
}


//bunu daha yaxi et ??

// {location.pathname == "/auth/sign-up" ? (
//           <div className="relative h-screen  flex items-center justify-center bg-gradient-to-r from-cyan-400 to-white">
            
//             {/* Overlay yalnız burda işləyəcək */}
//             <div className="absolute inset-0 bg-black/30 z-10"></div>

//             {/* Content */}
//             <div className="relative z-20 w-[90%] max-w-4xl bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl">
//               <Outlet />
//             </div>

//           </div>
//         ) : (
//           <main className="  p-10 bg-gray-300/40">
//             <Outlet />
//           </main>
//         )}



// export const ROUTES = {
  // SIGN_IN: "/auth/sign-in",
  // SIGN_UP: "/auth/sign-up", // sonra rahat dəyişəcəksən
  // DEPARTMENTS: "/departments",
// };

//bele bir sey yaz.



//ve adlanidrma artiq sign up yox create olmalidr deyesen ? her yerde duzelt 


//sign upda navbar cox pis gorunur duzelt .

//bu helelik numune ucun yazilib duzelt bunu gelecekde


