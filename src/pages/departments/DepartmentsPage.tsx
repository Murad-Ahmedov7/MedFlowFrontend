import DepartmentsTable from "@/features/departments/components/DepartmentsTable";
import useDepartments from "@/features/departments/hooks/useDepartments";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function DepartmentsPage() {
  const { departments, deleteDepartmentById } = useDepartments();
  const { t } = useTranslation();

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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-0">
      <div className="w-[95%] max-w-none mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Departments</h2>

          <Link
            to="/departments/new"
            className="bg-blue-500 text-white px-4 py-3 rounded-lg text-sm hover:bg-blue-600"
          >
            + {t("departments.add")}
          </Link>
        </div>

        <DepartmentsTable data={departments} onDelete={handleDelete} />
      </div>
    </div>
  );
}


