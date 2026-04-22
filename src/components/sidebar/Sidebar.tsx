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
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/departments/new")) {
      setOpenMenu("Departments");
    } else {
      setOpenMenu(null);
    }
  }, [location.pathname]);

  const menu = [
    // {
    //   title: "Main Menu",
    //   items: [
    //     { label: "Overview", icon: <FaThLarge />, path: "/overview" },
    //     { label: "Patient", icon: <FaUserInjured />, path: "/patients" },
    //     {
    //       label: "Appointment",
    //       icon: <FaCalendarAlt />,
    //       path: "/appointments",
    //     },
    //   ],
    // },
    {
      // title: "Other Menu",
      title: " Menu",
      items: [
        // { label: "Doctors", icon: <FaUserMd />, path: "/doctors" },
        // { label: "Employee", icon: <FaUsers />, path: "/employees" },

        // 🔥 Departments with submenu
        {
          label: "Departments",
          icon: <FaBuilding />,
          path: "/departments",
          children: [{ label: "Add Department", path: "/departments/new" }],
        },

        // { label: "Payment", icon: <FaMoneyBill />, path: "/payments" },
        // { label: "Product & Stock", icon: <FaBox />, path: "/products" },
      ],
    },
    // {
    //   title: "Help & Settings",
    //   items: [
    //     { label: "Help & Center", icon: <FaQuestionCircle />, path: "/help" },
    //     { label: "Settings", icon: <FaCog />, path: "/settings" },
    //     { label: "Report", icon: <FaFlag />, path: "/report" },
    //   ],
    // },
  ];

  return (
    <aside className="w-70 bg-gray-200/40 min-h-screen border-r border-gray-300/80 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <img
            src="/images/medflow_logo_only.png"
            alt="MedFlow Logo"
            className="w-10 h-10 object-contain"
          />
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
              {section.items.map((item, idx) => {
                const isOpen = openMenu === item.label;

                // 🔥 SUBMENU ITEM
                if (item.children) {
                  return (
                    <div key={idx}>
                      {/* 🔥 MAIN ROW */}
                      <div className="flex items-center justify-between">
                        {/* LEFT → NAVIGATION */}
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg flex-1 transition
                        ${
                          isActive || isOpen
                            ? "bg-cyan-100 text-cyan-700 font-medium border-r-2 border-cyan-600"
                            : "text-gray-600 hover:bg-gray-200"
                        }`
                          }
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.label}</span>
                        </NavLink>

                        {/* RIGHT → ARROW */}
                        <button
                          onClick={() =>
                            setOpenMenu(isOpen ? null : item.label)
                          }
                          className="px-2 text-gray-500 hover:text-gray-700"
                        >
                          <FaChevronUp
                            className={`transition-transform duration-300 ${
                              isOpen ? "rotate-180 text-cyan-600" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {/* 🔥 SUBMENU */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen ? "max-h-40" : "max-h-0"
                        }`}
                      >
                        <div className="ml-8 mt-1 space-y-1 border-l-2 border-gray-300 pl-3">
                          {item.children.map((sub, i) => (
                            <NavLink
                              key={i}
                              to={sub.path}
                              className={({ isActive }) =>
                                `flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition
                            ${
                              isActive
                                ? "bg-cyan-100/60  text-cyan-800 font-semibold "
                                : "text-gray-500 hover:bg-gray-200"
                            }`
                              }
                            >
                              {/* 🔥 Bullet */}
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>

                              <span>{sub.label}</span>
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                // 🔥 NORMAL ITEM
                return (
                  <NavLink
                    key={idx}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg transition
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
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}


// // src/
// //   layouts/
//     // MainLayout.tsx
//     // AuthLayout.tsx
//     // sidebar/
//     //   Sidebar.tsx
//     //   SidebarItem.tsx
//     //   sidebar.config.ts

// //lazim olsa fayllara bol.
