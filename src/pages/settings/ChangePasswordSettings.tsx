import { useChangePasswordForm } from "@/features/settings/hooks/useChangePasswordForm";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export default function ChangePasswordSettings() {
  const { t } = useTranslation();

  const { register, handleSubmit, watch, errors } = useChangePasswordForm();

  const currentPassword = watch("currentPassword");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
          bg-cyan-100
          text-cyan-600
          p-4
          rounded-2xl
          "
        >
          <FiLock size={26} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {t("settings.password.title")}
          </h2>

        <p className="text-gray-400 text-sm mt-1">{t("settings.password.subtitle")}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* CURRENT PASSWORD */}
        <div className="relative">
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder={t("settings.password.fields.currentPassword")}
            className="
            w-full
            bg-gray-50
            border border-gray-200
            rounded-2xl
            px-5 py-4
            pr-14
            outline-none
            transition
            focus:ring-2
            focus:ring-cyan-400
            focus:border-cyan-400
                  "
            {...register("currentPassword", {
              required: t("settings.password.validation.currentPasswordRequired"),
              minLength: {
                value: 8,
                message: t("settings.password.validation.minLength"),
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-cyan-500
            transition
            "
          >
            {showCurrentPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-2">
            {errors.currentPassword.message}
          </p>
        )}

        {/* NEW PASSWORD */}
        <div className="relative">
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder={t("settings.password.fields.newPassword")}
            {...register("newPassword", {
              required: t("settings.password.validation.newPasswordRequired"),
              minLength: {
                value: 8,
                message: t("settings.password.validation.minLength"),
              },
              validate: (value) => {
                if (value === currentPassword) {
                  return t("settings.password.validation.samePassword");
                }

                return true;
              },
            })}
            className="
            w-full
            bg-gray-50
            border border-gray-200
            rounded-2xl
            px-5 py-4
            pr-14
            outline-none
            transition
            focus:ring-2
            focus:ring-cyan-400
            focus:border-cyan-400
            "
          />

          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="
             absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-cyan-500
              transition
            "
          >
            {showNewPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-2">
            {errors.newPassword.message}
          </p>
        )}

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder={t("settings.password.fields.confirmPassword")}
            {...register("confirmPassword", {
              required: t("settings.password.validation.confirmPasswordRequired"),
              validate: (value) => {
                if (value !== watch("newPassword")) {
                  return t("settings.password.validation.passwordMismatch");
                }

                return true;
              },
            })}
            className="
            w-full
            bg-gray-50
            border border-gray-200
            rounded-2xl
            px-5 py-4
            pr-14
            outline-none
            transition
            focus:ring-2
            focus:ring-cyan-400
            focus:border-cyan-400
          "
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-cyan-500
                    transition
                  "
          >
            {showConfirmPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-2">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* BUTTON */}
        <button
          type="submit"
          className="
          w-full
          bg-cyan-500
          hover:bg-cyan-600
          text-white
          py-4
          rounded-2xl
          transition
          shadow-md
          font-semibold
          tracking-wide
          mt-3
        "
        >
          {t("settings.password.actions.submit")}
        </button>
      </form>
    </div>
  );
}

//inputlari ve useForm ayirca bir jsx yazib cagir.

//trigger elave et(useFormda ama duzgun islesin.)

// // newPassword dəyişəndə confirmPassword validation-ı
// // avtomatik yenidən trigger olunur.
// // Bu, cross-field validation zamanı köhnə/stale
// // error state qalmasının qarşısını alır.
// useEffect(() => {
//   trigger("confirmPassword");
// }, [newPassword, trigger]);

// // currentPassword dəyişəndə newPassword validation-ı
// // yenidən işləyir.
// // Beləliklə "current və new password eyni ola bilməz"
// // qaydası realtime düzgün işləyir.
// useEffect(() => {
//   trigger("newPassword");
// }, [currentPassword, trigger]);

