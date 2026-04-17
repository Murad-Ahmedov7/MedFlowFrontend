// import {  FaHospital, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
// // import { FaBuilding } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';

// export default function SideBar() {
//   const navigate = useNavigate();
//   const adminUsername = localStorage.getItem("admin_username");

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const menuItems = [
//     { label: "Deparments", icon: < FaHospital />, path: "/departments" },

//   ];

//   //typescript et burani

//   return (
//     <nav className="shadow-md min-h-screen bg-gradient-to-r from-slate-600 to-gray-400 text-white w-70 flex flex-col justify-between">
//       {/* Header */}
//       <div>
//         <div className="p-6 text-center">
//           <h1 className="text-2xl font-bold tracking-wide">Admin Panel</h1>
//         </div>

//         {/* Menu */}
//         <div className="px-4 py-2 space-y-2">
//           {menuItems.map((item, index) => (
//             <Link
//               to={item.path}
//               key={index}
//               className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer hover:bg-gradient-to-r hover:from-gray-800 hover:to-gray-400 hover:shadow-md"
//             >
//               <div className="text-lg">{item.icon}</div>
//               <span className="text-base font-medium">{item.label}</span>
//             </Link>
//           ))}
//         </div>
//       </div>

//         {/* Footer: Admin info + Logout */}
//         <div className="p-5 border-t border-white/20 flex flex-col items-center space-y-4 bg-slate-700">
//           {/* Admin info */}
//           <div className="flex items-center gap-3 text-lg text-white font-semibold">
//             <FaUserCircle className="text-2xl" />
//             <span className="break-all">{adminUsername}</span>
//           </div>

//           {/* Logout button */}
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white py-3 px-5 rounded-lg text-lg font-bold shadow-lg transition transform hover:scale-105"
//           >
//             <FaSignOutAlt className="text-xl" /> Logout
//           </button>
//         </div>

//         </nav>
//   );
// }

import {
  FaThLarge,
  FaUserInjured,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaBuilding,
  FaMoneyBill,
  FaBox,
  FaQuestionCircle,
  FaCog,
  FaFlag,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    {
      title: "Main Menu",
      items: [
        { label: "Overview", icon: <FaThLarge />, path: "/overview" },
        { label: "Patient", icon: <FaUserInjured />, path: "/patients" },
        {
          label: "Appointment",
          icon: <FaCalendarAlt />,
          path: "/appointments",
        },
      ],
    },
    {
      title: "Other Menu",
      items: [
        { label: "Doctors", icon: <FaUserMd />, path: "/doctors" },
        { label: "Employee", icon: <FaUsers />, path: "/employees" },
        { label: "Departments", icon: <FaBuilding />, path: "/departments" },
        { label: "Payment", icon: <FaMoneyBill />, path: "/payments" },
        { label: "Product & Stock", icon: <FaBox />, path: "/products" },
      ],
    },
    {
      title: "Help & Settings",
      items: [
        { label: "Help & Center", icon: <FaQuestionCircle />, path: "/help" },
        { label: "Settings", icon: <FaCog />, path: "/settings" },
        { label: "Report", icon: <FaFlag />, path: "/report" },
      ],
    },
  ];

  return (
    <>
      <aside className="w-70 bg-gray-200/40    min-h-screen  border-r border-gray-300/80 rounded-xl shadow-sm flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <img
              src="/images/medflow_logo_only.png"
              alt="MedFlow Logo"
              className="w-10 h-10 object-contain"
            />

            {/* Text */}
            <div>
              <h1 className="text-lg font-bold text-gray-800">MedFlow</h1>
              <p className="text-[13px] text-gray-400">
                Medical Management System
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 px-4 space-y-6">
          {menu.map((section, i) => (
            <div key={i}>
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item, idx) => (
                  <NavLink
                    key={idx}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ease-in-out
                    ${
                      isActive
                        ? "bg-cyan-100 text-cyan-700 font-medium border-r-2 border-cyan-600"
                        : "text-gray-600 hover:bg-gray-200"
                    }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

//burdaki kodu tam basa dus!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//footer da yaz

//export excel de yaz

//linkediinde ve ya youtbuba paylas kodu

//logout yaddan cixamra

//language theme(dark mode ve lighy mode)

//main menu alt menu da yaz app.tsxde linki var  tap mesen doctor basanda hem dcotr hem schedules

//burger menu duzelt animation  ile

//gomruk saytidan mantine ve dizanyiu gotur

// https://dribbble.com/search/patient-table

// https://dribbble.com/shots/21217373-Medical-Admin-Dashboard-Wecare

// // src/
// //   layouts/
//     // MainLayout.tsx
//     // AuthLayout.tsx
//     // sidebar/
//     //   Sidebar.tsx
//     //   SidebarItem.tsx
//     //   sidebar.config.ts

// //lazim olsa fayllara bol.

// //jwt decode islet yoxsa local storageden goturum

// NavLink = UI səviyyəsində aktivlik idarəsi
