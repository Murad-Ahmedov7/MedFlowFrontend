
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar";
import { Navbar } from "@/components/Navbar";



export default function MainLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Right side */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar />

        {/* Content */}
        <main className="flex-1 p-10 bg-gray-300/40">
          <Outlet />
        </main>
      </div>
    </div>
  )
}



//bu helelik numune ucun yazilib duzelt bunu gelecekde