import { useTranslation } from "react-i18next";
import { FiSettings } from "react-icons/fi";
import ChangePasswordSettings from "./ChangePasswordSettings";
import ProfileSettings from "./ProfileSettings";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-white
        to-cyan-50
        px-6
        py-10
      "
    >
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="
              bg-cyan-500
              text-white
              p-4
              rounded-3xl
              shadow-lg
            "
          >
            <FiSettings size={30} />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              {t("settings.title")}
            </h1>

            <p className="text-gray-500 mt-1 text-base">
           {t("settings.description")}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          
          {/* PROFILE CARD */}
          <ProfileSettings />

          {/* PASSWORD CARD */}
          <ChangePasswordSettings />
        </div>
      </div>
    </div>
  );
}

//   ACCOUNT CARD
//   <div
//     className="
//       bg-white
//       rounded-3xl
//       border border-cyan-100
//       shadow-lg
//       p-8
//       min-h-[320px]
//       hover:shadow-2xl
//       transition-all duration-300
//     "
//   >
//     <div className="flex items-center gap-4 mb-8">
//       <div
//         className="
//           bg-cyan-100
//           text-cyan-600
//           p-4
//           rounded-2xl
//         "
//       >
//         <FiShield size={24} />
//       </div>

//       <div>
//         <h2 className="text-xl font-semibold text-gray-800">
//           {t("settings.account.title")}
//         </h2>

//         <p className="text-gray-400 text-sm mt-1">
//           Account security
//         </p>
//       </div>
//     </div>

//     <div className="space-y-6">
//       <div>
//         <p className="text-sm text-gray-400 mb-1">
//           Last Login
//         </p>

//         <p className="font-semibold text-gray-700">
//           Today
//         </p>
//       </div>

//       <div>
//         <p className="text-sm text-gray-400 mb-2">
//           Status
//         </p>

//         <span
//           className="
//             inline-flex
//             items-center
//             bg-green-100
//             text-green-700
//             px-4 py-2
//             rounded-full
//             text-sm
//             font-semibold
//           "
//         >
//           Active
//         </span>
//       </div>
//     </div>
//   </div>
