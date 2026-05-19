import AuthInput from "@/features/auth/components/AuthInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { useEffect, useState } from "react";
import useDepartments from "@/features/departments/hooks/useDepartments";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useCreateDoctor } from "../hooks/useCreateDoctor";
import { useCreateReceptionist } from "../hooks/useCreateReceptionist";
import { useTranslation } from "react-i18next";

export default function CreateUserForm() {
  const [formRole, setFormRole] = useState<"doctor" | "receptionist" | "">("");
  const { t } = useTranslation();
  const { role: authRole } = useAuth();

  useEffect(() => {
    console.log(authRole);
  }, []);

  const doctorForm = useCreateDoctor();
  const receptionistForm = useCreateReceptionist();

  const activeForm = formRole === "doctor" ? doctorForm : receptionistForm;

  const { register, handleSubmit, errors, loading, watch } = activeForm as any; //any duzgun deyil eslinde type olmadir ama helelik bele yaz.

  const isStaff =
    formRole === "doctor" || formRole === "receptionist" || formRole === "";

  const password = watch("password");
  const { departments } = useDepartments();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 py-15 justify-center items-center"
    >
      <div className="w-100 h-45">
        <img src="/images/medflow-logo.png" alt="Logo" className="w-full" />
      </div>

      <div className="text-white flex flex-col items-center gap-4 ">
        <p className="text-white text-4xl  font-bold ">{t("createUser.subtitle")}</p>
      </div>



      {/* ================= STAFF ================= */}

      {isStaff && (
        <>
          <AuthInput
            label={t("createUser.fields.fullName")}
            type="text"
            {...register("fullName", {
              required: t("createUser.validation.fullNameRequired"),
            })}
            placeholder={t("createUser.placeholders.fullName")}
            error={errors.fullName?.message}
          />

          <AuthInput
            label={t("createUser.fields.email")}
            type="email"
            {...register("email", {
              required: t("createUser.validation.emailRequired"),
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: t("createUser.validation.invalidEmail"),
              },
            })}
            placeholder={t("createUser.placeholders.email")}
            error={errors.email?.message}
          />
        </>
      )}

      {/* ================= COMMON ================= */}

      <AuthInput
        label={t("createUser.fields.phone")}
        {...register("phone", {
          required: t("createUser.validation.phoneRequired"),
        })}
        placeholder="--- -- --- -- --"
        onChange={(e) => {
          let val = e.target.value.replace(/\D/g, ""); // rəqəm olmayanları sil
          if (val.length > 9) val = val.slice(0, 9); // maksimum 9 rəqəm

          let formatted = "";
          if (val.length > 0) formatted = val.slice(0, 3);
          if (val.length > 3) formatted += "-" + val.slice(3, 6);
          if (val.length > 6) formatted += "-" + val.slice(6, 8);
          if (val.length > 7) formatted += "-" + val.slice(7, 9);

          e.target.value = formatted;
        }}
        error={errors.phone?.message}
      />

      <div className="flex flex-col gap-1 w-[80%]">
        <label className="text-white/90 font-bold">
          {" "}
          {t("createUser.fields.role")}
        </label>

        <select
          value={formRole}
          onChange={(e) => setFormRole(e.target.value as any)}
          className="px-4 py-3 rounded-lg bg-white/90
          text-black text-base font-medium
          placeholder:text-gray-400 placeholder:text-md
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
        >
          <option value="" disabled>
            {t("createUser.placeholders.role")}
          </option>
          {authRole === "admin" && (
            <option value="receptionist">
              {" "}
              {t("createUser.roles.receptionist")}
            </option>
          )}
          <option value="doctor"> {t("createUser.roles.doctor")}</option>
        </select>
      </div>

      {/* ================= STAFF ================= */}

      {isStaff && (
        <>
          <PasswordInput
            label={t("createUser.fields.password")}
            {...register("password", {
              required: t("createUser.validation.passwordRequired"),
              minLength: {
                value: 8,
                message: t("createUser.validation.passwordMin"),
              },
            })}
            placeholder={t("createUser.placeholders.password")}
            error={errors.password?.message}
          />

          <PasswordInput
            label={t("createUser.fields.confirmPassword")}
            {...register("confirmPassword", {
              required: t("createUser.validation.confirmPasswordRequired"),
              validate: (value) =>
                value === password ||
                t("createUser.validation.passwordMismatch"),
            })}
            placeholder={t("createUser.placeholders.confirmPassword")}
            error={errors.confirmPassword?.message}
          />
        </>
      )}
      {/* ================= DOCTOR ================= */}
      {formRole === "doctor" && (
        <>
          <div className="flex flex-col gap-1 w-[80%]">
            <label className="text-white/90 font-bold">
              {" "}
              {t("createUser.fields.department")}
            </label>

            <select
              {...register("departmentId", {
                required: t("createUser.validation.departmentRequired"),
              })}
              defaultValue=""
              className="px-4 py-3 rounded-lg bg-white/90
          text-black text-base font-medium
          placeholder:text-gray-400 placeholder:text-md
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
            >
              <option value="" disabled>
                {t("createUser.placeholders.department")}
              </option>

              {departments.map((d: any) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>

            {errors.departmentId && (
              <p className="text-[#ef4444] text-[20px] text-center">
                {errors.departmentId.message}
              </p>
            )}
          </div>

          {/* <div className="flex flex-col gap-1 w-[80%]">
        <label className="text-white/90 font-bold">Specialty</label>

        <select
          {...register("departmentId", { required: "departmentId is required" })}
          defaultValue=""
          className="px-4 py-3 rounded-lg bg-white/90
          text-black text-base font-medium
          placeholder:text-gray-400 placeholder:text-md
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
        >
          <option value="" disabled>
            Select Specialty
          </option>
          
          <option value="Receptionist">Spec1</option>
          <option value="Doctor">Spec2</option>
          <option value="Patient">Spec3</option>
        </select>

        )}
        </div> */}
        </>
      )}


      <div className="w-[80%] mt-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-800 text-white font-semibold rounded-2xl"
        >
          {loading
            ? t("createUser.actions.loading")
            : t("createUser.actions.submit")}
          {/* Sign Up */}
        </button>
      </div>
    </form>
  );
}

//burda useAuth isletmeliyik elsinde bele yox.ama useAuth sonradan elave olundu deye deyismek istemirem.

//role ucun errors islet necese

//qan qruplari duzgun gorsenir onu sorus.

//receptinosit departmentleri gormelidir?

//url ve ad auth/sign-up olsun yoxsa create user bele bir sey?(deyisdim desktopda sekili de var ve muellim ile de danis)

// before i change to create user.jpg

//patients.jpg

// 1. Auth (login sonrası)
// user daxil oldu → role = admin

// 👉 məqsəd:

// kimdir?

// ➡️ auth ✔

// 2. Admin create zamanı
// admin → yeni user yaradır → role seçir

// 👉 məqsəd:

// bu user nə olacaq?

// ➡️ bu artıq business logic-dir

// Auth role → mövcud user haqqında məlumat
// Create role → yeni user üçün təyin edilir


//json fayllarinda createUser icinde title ve subtile adlari duz deyil deyis