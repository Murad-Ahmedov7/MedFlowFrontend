import { ExportButton } from "@/components/export-button/ExportButton";
import { useAuth } from "@/features/auth/context/AuthContext";
import DepartmentsTable from "@/features/departments/components/DepartmentsTable";
import useDepartments from "@/features/departments/hooks/useDepartments";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function DepartmentsPage() {
  const { departments, deleteDepartmentById } = useDepartments();
  const { t } = useTranslation();

  const { role } = useAuth();

  const handleDelete = async (id: string, name: string) => {
    const confirmed = confirm(
      `Delete "${name}" department? This action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      await deleteDepartmentById(id);
    } catch {
      alert("Delete failed");
    }
  };

  console.log(role);

  const formattedDepartments = departments.map((department) => ({
    [t("departments.title")]: department.name,
  }));

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-0">
      <div className="w-[95%] max-w-none mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{t("departments.title")}</h2>
          <div className="flex items-center gap-3">
            <ExportButton data={formattedDepartments} fileName="departments" />
            {role === "admin" && (
              <Link
                to="/departments/new"
                className="bg-blue-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-blue-600"
              >
                + {t("departments.add")}
              </Link>
            )}
          </div>
        </div>

        <DepartmentsTable data={departments} onDelete={handleDelete} />
      </div>
    </div>
  );
}
