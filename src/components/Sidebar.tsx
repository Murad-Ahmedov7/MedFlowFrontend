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
  FaUserPlus,
  FaHospitalUser,
} from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth/context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { tokenService } from "@/services/tokenService";

interface SidebarProps {
  isSidebarOpen: boolean;
}

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const location = useLocation();

  const { t } = useTranslation();

  const { role } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
  const confirmed = confirm(
    "Are you sure you want to logout?",
  );

  if (!confirmed) return;

  tokenService.clear();
  navigate("/auth/sign-in");
};

useEffect(() => {
  if (!location.pathname.endsWith("/new")) {
    setOpenMenu(null);
  }
}, [location.pathname]);
const autoOpenMenu =
  location.pathname.endsWith("/new")
    ? `${location.pathname.split("/")[1]}.title`
    : null;


  // const menu = [
  //   // {
  //   //   title: "Main Menu",
  //   //   items: [
  //   //     { label: "Overview", icon: <FaThLarge />, path: "/overview" },
  //   //     { label: "Patient", icon: <FaUserInjured />, path: "/patients" },
  //   //     {
  //   //       label: "Appointment",
  //   //       icon: <FaCalendarAlt />,
  //   //       path: "/appointments",
  //   //     },
  //   //   ],
  //   // },
  //   {
  //     // title: "Other Menu",
  //     title: " Menu",
  //     items: [
  //       // { label: "Doctors", icon: <FaUserMd />, path: "/doctors" },
  //       // { label: "Employee", icon: <FaUsers />, path: "/employees" },

  //       // 🔥 Departments with submenu
  //       {
  //         label: "Departments",
  //         icon: <FaBuilding />,
  //         path: "/departments",
  //         children: [{ label: "Add Department", path: "/departments/new" }],
  //       },

  //       // { label: "Payment", icon: <FaMoneyBill />, path: "/payments" },
  //       // { label: "Product & Stock", icon: <FaBox />, path: "/products" },
  //     ],
  //   },
  //   // {
  //   //   title: "Help & Settings",
  //   //   items: [
  //   //     { label: "Help & Center", icon: <FaQuestionCircle />, path: "/help" },
  //   //     { label: "Settings", icon: <FaCog />, path: "/settings" },
  //   //     { label: "Report", icon: <FaFlag />, path: "/report" },
  //   //   ],
  //   // },
  // ];


  const menu = [
    {
      titleKey: "menu.title",
      items: [
        ...(role === "admin" || role === "receptionist"
          ? [
              {
                labelKey: "createUser.title",
                icon: <FaUserPlus />,
                path: "/users/create",
              },
            ]
          : []),

        {
          labelKey: "departments.title",
          icon: <FaBuilding />,
          path: "/departments",

          ...(role === "admin" && {
            children: [
              {
                labelKey: "departments.add",
                path: "/departments/new",
              },
            ],
          }),
        },

        {
          labelKey: "patients.title",
          icon: <FaUserInjured />,
          path: "/patients",

          ...(role === "admin" || role === "receptionist"
            ? {
                children: [
                  {
                    labelKey: "patients.add",
                    path: "/patients/new",
                  },
                ],
              }
            : {}),
        },
      ],
    },
  ];
  return (
    <aside
      className={`
    bg-gray-200/40 min-h-screen border-r border-gray-300/80 shadow-sm flex flex-col
    transition-all duration-300 ease-in-out
    
    ${isSidebarOpen ? "min-w-70" : "w-20"}
  `}
    >
      {/* Logo */}
      <div className="flex p-5">
        <div className="flex items-center gap-3  shrink-0">
          <img
            src="/images/medflow_logo_only.png"
            alt="MedFlow Logo"
            className="w-10 h-10 object-contain"
          />

          {isSidebarOpen && (
            <div className="max-w-60">
              <h1 className="text-lg font-bold text-gray-800">
                {t("app.name")}
              </h1>
              <p className="text-[13px] text-gray-400">{t("app.subtitle")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 space-y-6">
        {menu.map((section, i) => (
          <div key={i}>
            {/* 🔥 Section Title */}
            {isSidebarOpen && (
              <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
                {t(section.titleKey)}
              </p>
            )}

            <div className="space-y-1 ">
              {section.items.map((item, idx) => {
                const isOpen =
                  location.pathname.startsWith(item.path) &&
                  (
                    openMenu === item.labelKey ||
                    autoOpenMenu === item.labelKey
                  );

                if (item.children) {
                  return (
                    <div key={idx}>
                      <div className="flex items-center justify-between group relative">
                        <NavLink
                          to={item.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg flex-1 transition
                          ${
                            isActive || isOpen
                              ? "bg-cyan-100 text-cyan-700 font-medium border-r-2 border-cyan-600 "
                              : "text-gray-600 hover:bg-gray-200"
                          }`
                          }
                        >
                          <span className="text-lg">{item.icon}</span>
                          {!isSidebarOpen ? (
                            <span
                              className="
                              absolute left-full ml-3
                              top-1/2 -translate-y-1/2
                              bg-white text-gray-800 text-sm
                              px-3 py-1.5 rounded-md
                              shadow-lg border border-gray-200
                              opacity-0 group-hover:opacity-100
                              transition duration-200
                              whitespace-nowrap z-50
                            "
                            >
                              {t(item.labelKey)}
                            </span>
                          ) : (
                            <span>{t(item.labelKey)}</span>
                          )}
                        </NavLink>

                        {isSidebarOpen && (
                          <button
                            onClick={() =>
                              setOpenMenu(isOpen ? null : item.labelKey)
                            }
                            className="px-2 text-gray-500 hover:text-gray-700"
                          >
                            <FaChevronUp
                              className={`transition-transform duration-300 ${
                                isOpen ? "rotate-180 text-cyan-600" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      {/* SUBMENU */}
                      {isSidebarOpen && (
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
                                  ? "bg-cyan-100/60 text-cyan-800 font-semibold"
                                  : "text-gray-500 hover:bg-gray-200"
                              }`
                                }
                              >
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                                <span>{t(sub.labelKey)}</span>
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div className="group relative">
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
                      {/* 🔥 TOOLTIP (closed halda) */}
                      {!isSidebarOpen ? (
                        <span
                          className="
                              absolute left-full ml-3
                              top-1/2 -translate-y-1/2
                              bg-white text-gray-800 text-sm
                              px-3 py-1.5 rounded-md
                              shadow-lg border border-gray-200
                              opacity-0 group-hover:opacity-100
                              transition duration-200
                              whitespace-nowrap z-50
                            "
                        >
                          {t(item.labelKey)}
                        </span>
                      ) : (
                        <span>{t(item.labelKey)}</span>
                      )}
                    </NavLink>

                    
                  </div>
                );
              })}
              
              
            </div>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="p-4 mt-auto ">
        <button
        onClick={handleLogout}
          className="
            flex items-center gap-3
            text-red-500
            hover:bg-red-50
            px-4 py-3
            rounded-xl
            transition
            w-full
          "
        >
          <FiLogOut size={20} />

          {isSidebarOpen && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}


//  burda problem odu ki patientdeki arrow-a bassam indi departmensdeki submenu baglanar ama bu duz deyil de duzelt
///sidebariiiiiiiiii baglaytanda o tablarin adi gorunur 1 saniyelik onu da duzelt(yeni hoverlari)
////////////////

/////////aside-da olan min width var deye smooth baglanmir.(ve sidebari acib baglayanda o hover olan yazilar gorsenir qisa muddeltlik)

////////////////errror ve forbidden mesajlarini da tercume et(dialog kimi cixan)......................

// // src/
// //   layouts/
//     // MainLayout.tsx
//     // AuthLayout.tsx
//     // sidebar/
//     //   Sidebar.tsx
//     //   SidebarItem.tsx
//     //   sidebar.config.ts

// //lazim olsa fayllara bol.


//lazim olsa import da yaz.