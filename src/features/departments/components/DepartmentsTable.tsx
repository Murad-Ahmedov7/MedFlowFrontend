import { FaTrash } from "react-icons/fa";
import type { DepartmentResponse } from "../types/department.types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/features/auth/context/AuthContext";
import { usePagination } from "@/components/pagination/usePagination";
import Pagination from "@/components/pagination/Pagination";

interface Props {
  data: DepartmentResponse[];
  onDelete: (id: string, name: string) => void;
}

export default function DepartmentsTable({ data, onDelete }: Props) {
  const { t } = useTranslation();

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination({
      data,
      itemsPerPage: 5,
    });

  const { role } = useAuth();

  return (
    <>
      {data.length === 0 ? (
        <p className="text-gray-500"> {t("departments.empty")}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] table-fixed border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white">
                  <th className="p-3 text-left">{t("departments.name")}</th>
                  {/* <th className="p-3 text-left">Created At</th> */}
                  {role === "admin" && (
                    <>
                      <th className="p-3 text-center">{t("common.delete")}</th>
                      <th className="p-3 text-center ">{t("common.edit")}</th>
                    </>
                  )}
                  <th className="p-3 text-center">{t("common.view")}</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((dep, index) => (
                  <tr
                    key={dep.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-200 transition duration-200 ease-in-out`}
                  >
                    <td className="p-3 font-medium text-gray-800">
                      {dep.name}
                    </td>
                    {/* <td className="p-3 font-medium text-gray-800">
                  {dep.createdAt}
                </td> */}

                    {role === "admin" && (
                      <>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => onDelete(dep.id, dep.name)}
                            // className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full shadow flex items-center gap-1 mx-auto transition duration-150 ease-in-out"
                            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full shadow inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[120px] transition duration-150 ease-in-out"
                          >
                            <FaTrash className="text-sm" />
                            <span>{t("common.delete")}</span>
                          </button>
                        </td>
                        <td className="p-3 text-center ">
                          <Link
                            to={`/departments/edit/${dep.id}`}
                            // className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full shadow mx-auto transition duration-150 ease-in-out   "

                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full shadow inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[140px] transition duration-150 ease-in-out"
                          >
                            ✏️ {t("common.edit")}
                          </Link>
                        </td>
                      </>
                    )}
                    <td className="p-3 text-center ">
                      <Link
                        to={`/departments/view/${dep.id}`}
                        // className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[120px]"
                      >
                        👁 {t("common.view")}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}