import AuthInput from "@/features/auth/components/AuthInput";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { useCreateDoctorForm } from "../hooks/useCreateDoctorForm";
import { useState } from "react";
import useDepartments from "@/features/departments/hooks/useDepartments";
import { useCreateReceptionistForm } from "../hooks/useCreateReceptionistForm";
import { useCreatePatientForm } from "@/features/patients/hooks/useCreatePatientForm";
import { BloodGroup, Gender } from "@/features/patients/types/patient.types";

export default function SignUpForm() {
  const [role, setRole] = useState<"Doctor" | "Receptionist" | "Patient" | "">(
    "",
  );

  const doctorForm = useCreateDoctorForm();
  const receptionistForm = useCreateReceptionistForm();
  const patientForm = useCreatePatientForm();

  const activeForm =
    role === "Doctor"
      ? doctorForm
      : role === "Receptionist"
        ? receptionistForm
        : patientForm;

  const { register, handleSubmit, errors, loading, watch } = activeForm as any; //any duzgun deyil eslinde type olmadir ama helelik bele yaz.

  const isPatient = role === "Patient";
  const isStaff = role === "Doctor" || role === "Receptionist" || role === "";

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
        <p className="text-white text-4xl  font-bold ">Create an account</p>
      </div>

      {/* ================= PATIENT ================= */}
      {isPatient && (
        <>
          <AuthInput
            label=" First Name"
            type="text"
            {...register("firstName", { required: " First Name is required" })}
            placeholder="Enter your first name"
            error={errors.firstname?.message}
          />

          <AuthInput
            label=" Last Name"
            type="text"
            {...register("lastName", { required: " Last Name is required" })}
            placeholder="Enter your last name"
            error={errors.lastname?.message}
          />

          <AuthInput
            label=" Fin"
            type="text"
            {...register("fin", { required: " Fin is required" })}
            placeholder="Enter your Fin"
            error={errors.fin?.message}
          />
        </>
      )}

      {/* ================= STAFF ================= */}

      {isStaff && (
        <>
          <AuthInput
            label="Full Name"
            type="text"
            {...register("fullName", { required: "Full Name is required" })}
            placeholder="Enter your name"
            error={errors.fullName?.message}
          />

          <AuthInput
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your email"
            error={errors.email?.message}
          />
        </>
      )}

      {/* ================= COMMON ================= */}

      <AuthInput
        label="Phone"
        {...register("phone", {
          required: "Phone is required",
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
        <label className="text-white/90 font-bold">Role</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
          className="px-4 py-3 rounded-lg bg-white/90
          text-black text-base font-medium
          placeholder:text-gray-400 placeholder:text-md
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="Receptionist">Receptionist</option>
          <option value="Doctor">Doctor</option>
          <option value="Patient">Patient</option>
        </select>
      </div>

      {/* ================= STAFF ================= */}

      {isStaff && (
        <>
          <PasswordInput
            label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            placeholder="Enter your password"
            error={errors.password?.message}
          />

          <PasswordInput
            label="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm password"
            error={errors.confirmPassword?.message}
          />
        </>
      )}
      {/* ================= DOCTOR ================= */}
      {role === "Doctor" && (
        <>
          <div className="flex flex-col gap-1 w-[80%]">
            <label className="text-white/90 font-bold">Department</label>

            <select
              {...register("departmentId", {
                required: "Department is required",
              })}
              defaultValue=""
              className="px-4 py-3 rounded-lg bg-white/90
          text-black text-base font-medium
          placeholder:text-gray-400 placeholder:text-md
          focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
            >
              <option value="" disabled>
                Select Deparment
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

      {/* ================= PATIENT EXTRA ================= */}

      {isPatient && (
        <>
          <AuthInput
            label="Address"
            type="text"
            {...register("address")}
            placeholder="Enter your Address"
            error={errors.address?.message}
          />
          <AuthInput
            label="Birthdate"
            type="date"
            {...register("birthdate", { required: "Birthdate is required" })}
            error={errors.birthdate?.message}
          />

          <div className="flex flex-col gap-1 w-[80%]">
            <label className="text-white/90 font-bold">Gender</label>

            <select
              {...register("gender", {
                required: "Gender is required",
                valueAsNumber: true,
              })}
              className="px-4 py-3 rounded-lg bg-white/90
              text-black text-base font-medium
              placeholder:text-gray-400 placeholder:text-md
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value={Gender.Male}>Male</option>
              <option value={Gender.Female}>Female</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 w-[80%]">
            <label className="text-white/90 font-bold">Blood Group</label>

            <select
              {...register("bloodGroup", {
                required: "Blood group is required",
                valueAsNumber: true,
              })}
              className="px-4 py-3 rounded-lg bg-white/90
              text-black text-base font-medium
              placeholder:text-gray-400 placeholder:text-md
              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:placeholder:text-transparent shadow-xl border border-white/20"
            >
              <option value="" disabled>
                Select Blood Group
              </option>

              <option value={BloodGroup.Unknown}>Unknown</option>
              <option value={BloodGroup.OPlus}>O+</option>
              <option value={BloodGroup.OMinus}>O-</option>
              <option value={BloodGroup.APlus}>A+</option>
              <option value={BloodGroup.AMinus}>A-</option>
              <option value={BloodGroup.BPlus}>B+</option>
              <option value={BloodGroup.BMinus}>B-</option>
              <option value={BloodGroup.ABPlus}>AB+</option>
              <option value={BloodGroup.ABMinus}>AB-</option>
            </select>
          </div>

          <AuthInput
            label="Allergies"
            type="text"
            {...register("allergies")}
            placeholder="Enter your allergies"
            error={errors.allergies?.message}
          />
        </>
      )}

      <div className="w-[80%] mt-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 transition-colors duration-800 text-white font-semibold rounded-2xl"
        >
          {loading ? "Loading..." : "Sign Up"}
          {/* Sign Up */}
        </button>
      </div>
    </form>
  );
}


