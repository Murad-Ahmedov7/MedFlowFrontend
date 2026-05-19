import PatientFormInput from "@/features/patients/components/PatientFormInput";
import { useEditPatientForm } from "@/features/patients/hooks/useEditPatientForm";
import { usePatients } from "@/features/patients/hooks/usePatients";
import { BloodGroup, Gender } from "@/features/patients/types/patient.types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function UpdatePatientPage() {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const { patient } = usePatients();
  const { register, handleSubmit, errors, reset } = useEditPatientForm();

  console.log(patient);
  useEffect(() => {
    if (patient) {
      reset({
        firstName: patient.firstName,
        lastName: patient.lastName,
        fin: patient.fin,
        phone: patient.phone,
        address: patient.address ?? "",
        birthDate: patient.birthDate.split("T")[0],
        gender: Gender[patient.gender as keyof typeof Gender],

        bloodGroup: BloodGroup[patient.bloodGroup as keyof typeof BloodGroup],
        allergies: patient.allergies ?? "",
      });
    }
  }, [patient, reset]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-cyan-50 py-10 px-4">
      <div
        className="
              max-w-6xl mx-auto
              bg-white
              border border-cyan-100
              shadow-xl
              rounded-2xl
              p-8
            "
      >
        {/* Header */}
        <div className="border-b border-cyan-100 pb-5 mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            {t("patients.edit")}
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <PatientFormInput
            label={t("patients.fields.firstName")}
            type="text"
            required
            placeholder={t("patients.placeholders.firstName")}
            error={errors.firstName?.message}
            {...register("firstName", {
              required: t("patients.validation.firstNameRequired"),
            })}
          />
          <PatientFormInput
            label={t("patients.fields.lastName")}
            type="text"
            required
            placeholder={t("patients.placeholders.lastName")}
            error={errors.lastName?.message}
            {...register("lastName", {
              required: t("patients.validation.lastNameRequired"),
            })}
          />
          <PatientFormInput
            label={t("patients.fields.fin")}
            required
            placeholder={t("patients.placeholders.fin")}
            error={errors.fin?.message}
            maxLength={7}
            {...register("fin", {
              required: t("patients.validation.finRequired"),

              minLength: {
                value: 7,
                message: t("patients.validation.finLength"),
              },

              maxLength: {
                value: 7,
                message: t("patients.validation.finLength"),
              },

              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{7}$/,

                message: t("patients.validation.finFormat"),
              },
              setValueAs: (value) => value?.toUpperCase(),
            })}
          />
          <PatientFormInput
            label={t("patients.fields.phone")}
            required
            placeholder={t("patients.placeholders.phone")}
            error={errors.phone?.message}
            {...register("phone", {
              required: t("patients.validation.phoneRequired"),

              onChange: (e) => {
                let val = e.target.value.replace(/\D/g, "");

                if (val.length > 10) {
                  val = val.slice(0, 10);
                }

                let formatted = "";

                if (val.length > 0) {
                  formatted = val.slice(0, 3);
                }

                if (val.length > 3) {
                  formatted += "-" + val.slice(3, 6);
                }

                if (val.length > 6) {
                  formatted += "-" + val.slice(6, 8);
                }

                if (val.length > 8) {
                  formatted += "-" + val.slice(8, 10);
                }

                e.target.value = formatted;
              },
            })}
          />
          <PatientFormInput
            label={t("patients.fields.address")}
            placeholder={t("patients.placeholders.address")}
            error={errors.address?.message}
            {...register("address")}
          />
          <PatientFormInput
            type="date"
            label={t("patients.fields.birthDate")}
            required
            error={errors.birthDate?.message}
            max={new Date().toISOString().split("T")[0]}
            {...register("birthDate", {
              required: t("patients.validation.birthDateRequired"),

              validate: (value) =>
                new Date(value) < new Date() ||
                t("patients.validation.birthDatePast"),
            })}
          />
          {/* Gender */}
          <div className="flex flex-col gap-1">
            <label
              className="
                text-xs uppercase tracking-wide
                text-gray-500 font-semibold
                "
            >
              {t("patients.fields.gender")}

              <span className="text-red-500 ml-1 text-lg">*</span>
            </label>

            <select
              {...register("gender", {
                required: t("patients.validation.genderRequired"),
              })}
              className="
                w-full
                px-4 py-3
                rounded-xl
                border border-gray-300
                bg-white
                text-gray-800
                focus:outline-none
                focus:ring-2
                focus:ring-cyan-500
                focus:border-cyan-500
                transition
                shadow-sm
                "
            >
              <option value="" disabled>
                {t("patients.selectDefaults.gender")}
              </option>

              <option value={Gender.Male}>
                {t("patients.genderOptions.male")}
              </option>

              <option value={Gender.Female}>
                {t("patients.genderOptions.female")}
              </option>
            </select>

            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.gender.message}
              </p>
            )}
          </div>

          {/* Blood Group */}
          <div className="flex flex-col gap-1">
            <label
              className="
                    text-xs uppercase tracking-wide
                    text-gray-500 font-semibold
                    "
            >
              {t("patients.fields.bloodGroup")}

              <span className="text-red-500 ml-1 text-lg">*</span>
            </label>

            <select
              {...register("bloodGroup", {
                required: t("patients.validation.bloodGroupRequired"),
              })}
              className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    border border-gray-300
                    bg-white
                    text-gray-800
                    focus:outline-none
                    focus:ring-2
                    focus:ring-cyan-500
                    focus:border-cyan-500
                    transition
                    shadow-sm
                    "
            >
              <option value="" disabled>
                {t("patients.selectDefaults.bloodGroup")}
              </option>

              <option value={BloodGroup.OPlus}>O+</option>

              <option value={BloodGroup.OMinus}>O-</option>

              <option value={BloodGroup.APlus}>A+</option>

              <option value={BloodGroup.AMinus}>A-</option>

              <option value={BloodGroup.BPlus}>B+</option>

              <option value={BloodGroup.BMinus}>B-</option>

              <option value={BloodGroup.ABPlus}>AB+</option>

              <option value={BloodGroup.ABMinus}>AB-</option>
            </select>

            {errors.bloodGroup && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bloodGroup.message}
              </p>
            )}
          </div>

          {/* Allergies */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label
              className="
            text-xs uppercase tracking-wide
            text-gray-500 font-semibold
          "
            >
              {t("patients.fields.allergies")}
            </label>

            <textarea
              placeholder={t("patients.placeholders.allergies")}
              rows={5}
              {...register("allergies")}
              className="
            w-full
            px-4 py-3
            rounded-xl
            border border-gray-300
            bg-white
            text-gray-800
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-cyan-500
            focus:border-cyan-500
            transition
            shadow-sm
            resize-none
          "
            />
          </div>
          {/* {/* Actions */}
          <div className="md:col-span-2 flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/patients")}
              className="
                  px-5 py-3
                    rounded-xl
                  border border-gray-300
                bg-white
                  hover:bg-gray-100
                    text-gray-700
                    transition
                  "
            >
              {t("common.cancel")}
            </button>

            <button
              type="submit"
              className="
                    px-6 py-3
                    rounded-xl
                    bg-cyan-600
                    hover:bg-cyan-700
                    text-white
                    shadow-md
                    hover:shadow-lg
                    transition
                  "
            >
              {t("common.save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
