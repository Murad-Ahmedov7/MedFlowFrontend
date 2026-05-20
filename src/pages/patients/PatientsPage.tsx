import { ExportButton } from "@/components/export-button/ExportButton";
import { useAuth } from "@/features/auth/context/AuthContext";
import PatientsTable from "@/features/patients/components/PatientsTable";
import { usePatients } from "@/features/patients/hooks/usePatients";
import { BloodGroup } from "@/features/patients/types/patient.types";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function PatientsPage() {
  const { patients, deletePatientById } = usePatients();

  const { t } = useTranslation();

  const { role } = useAuth();

  const handleDelete = async (id: string, name: string) => {
    const confirmed = confirm(
      `Delete "${name}" Patient? This action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await deletePatientById(id);
    } catch {
      alert("Delete failed");
    }
  };

  const formattedPatients = patients.map((patient) => ({
    [t("patients.fields.firstName")]: patient.firstName,

    [t("patients.fields.lastName")]: patient.lastName,

    [t("patients.fields.fin")]: patient.fin,
    [t("patients.fields.phone")]: patient.phone,
    

    [t("patients.fields.address")]: patient.address ?? "N/A",

    [t("patients.fields.birthDate")]: new Date(
      patient.birthDate,
    ).toLocaleDateString("en-GB"),

    [t("patients.fields.gender")]: patient.gender,

    [t("patients.fields.bloodGroup")]: patient.bloodGroup,

    [t("patients.fields.allergies")]: patient.allergies ?? "N/A",
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-0">
      <div className="w-[95%] max-w-none mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl mb-2 font-semibold">{t("patients.title")}</h2>

          <div className="flex items-center gap-3">
            <ExportButton data={formattedPatients} fileName="patients" />

            {(role === "admin" || role === "receptionist") && (
              <Link
                to="/patients/new"
                className="bg-blue-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-blue-600"
              >
                + {t("patients.add")}
              </Link>
            )}
          </div>
        </div>

        <PatientsTable data={patients} onDelete={handleDelete} />
      </div>
    </div>
  );
}