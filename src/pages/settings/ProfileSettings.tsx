import { useAuth } from "@/features/auth/context/AuthContext";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiMail, FiUserCheck, FiCopy, FiCheck, FiUser } from "react-icons/fi";

export default function ProfileSettings() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const { role, email } = useAuth();
  return (
    <div
      className="
      bg-white
      rounded-3xl
      border border-cyan-100
      shadow-lg
      p-8
      hover:shadow-2xl
      transition-all duration-300
      "
    >
      <div className="flex items-center gap-4 mb-8">
        <div
          className="
         w-20 h-20
         rounded-3xl
         bg-cyan-500
         text-white
         flex items-center justify-center
         text-2xl font-bold
         shadow-md
         "
        >
          <FiUser size={34} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {t("settings.profile.title")}
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            {t("settings.profile.subtitle")}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <div className="space-y-8">
          {/* EMAIL */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div
                className="
                bg-cyan-100
                p-4
                rounded-2xl
                text-cyan-600
                "
              >
                <FiMail size={24} />
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  {t("settings.profile.fields.email")}
                </p>
                <p className="font-semibold text-lgtext-gray-700">{email}</p>
              </div>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText("example@mail.com");

                setCopied(true);

                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
              className="
              border
              border-gray-200
              p-3
              rounded-2xl
              hover:bg-gray-50
              transition
            "
            >
              {copied ? (
                <FiCheck size={18} className="text-green-500" />
              ) : (
                <FiCopy size={18} className="text-gray-500" />
              )}
            </button>
          </div>

          {/* ROLE */}
          <div className="flex items-center gap-5">
            <div
              className="
               bg-cyan-100
               p-4
               rounded-2xl
               text-cyan-600
               "
            >
              <FiUserCheck size={24} />
            </div>

            <div>
              <p className="text-sm text-gray-400">
                {t("settings.profile.fields.role")}
              </p>

              <p
                className="
                font-semibold
                text-lg
                text-gray-700
                capitalize
                "
              >
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
