import { useTranslation } from "react-i18next";
import type { PatientResponse } from "../types/patient.types";
import { usePagination } from "@/components/pagination/usePagination";
import { useAuth } from "@/features/auth/context/AuthContext";
import Pagination from "@/components/pagination/Pagination";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

interface Props {
  data: PatientResponse[];
  onDelete: (id: string, firstName: string) => void;
}

export default function PatientsTable({ data, onDelete }: Props) {
  const { t } = useTranslation();

  const { currentData, currentPage, totalPages, setCurrentPage } =
    usePagination({
      data,
      itemsPerPage: 5,
    });

  const { role } = useAuth();

  const patientHeaders = [
    t("patients.fields.firstName"),
    t("patients.fields.lastName"),
    t("patients.fields.fin"),
    t("patients.fields.phone"),
    t("patients.fields.address"),
    t("patients.fields.birthDate"),
    t("patients.fields.gender"),
    t("patients.fields.bloodGroup"),
    t("patients.fields.allergies"),
  ];

  return (
    <>
      {data.length === 0 ? (
        <p className="text-gray-500"> {t("departments.empty")}</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1900px] table-fixed border-collapse">
              <thead>
                <tr className="bg-gray-700 text-white">
                 

                  {patientHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-3 py-2 text-left whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                  {(role === "admin" || role === "receptionist") && (
                    <>
                      <th className="p-3 text-center">{t("common.delete")}</th>

                      <th className="p-3 text-center">{t("common.edit")}</th>
                    </>
                  )}
                  <th className="p-3 text-center">{t("common.view")}</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((pat, index) => (
                  <tr
                    key={pat.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-gray-200 transition duration-200 ease-in-out`}
                  >


                    <td className="p-3 font-medium text-gray-800">
                      {pat.firstName}
                    </td>
                    <td className="p-3 font-medium text-gray-800">
                      {pat.lastName}
                    </td>
                    <td className="p-3 font-medium text-gray-800">{pat.fin}</td>
                    <td className="p-3 font-medium text-gray-800">
                      {pat.phone}
                    </td>
                    <td className="p-3 font-medium text-gray-800">
                      {pat.address || "N/A"}
                    </td>
                    <td className="p-3 font-medium text-gray-800">
                      {new Date(pat.birthDate).toLocaleDateString("en-GB")}
                    </td>
                    {/* <td>{new Date(pat.birthDate).toLocaleDateString()}</td> */}
                    <td className="p-3 font-medium text-gray-800">
                      {pat.gender}
                    </td>
                    <td className="p-3 font-medium text-gray-800">
                      {pat.bloodGroup}
                    </td>
                    <td className="p-3 font-medium text-gray-800">
                      {pat.allergies || "N/A"}
                    </td>

                    {(role === "admin" || role === "receptionist") && (
                      <>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => onDelete(pat.id, pat.firstName)}
                            // className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full shadow flex items-center gap-1 mx-auto transition duration-150 ease-in-out"
                            className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-full shadow inline-flex items-center justify-center gap-1 whitespace-nowrap min-w-[120px] transition duration-150 ease-in-out"
                          >
                            <FaTrash className="text-sm" />
                            <span>{t("common.delete")}</span>
                          </button>
                        </td>
                        <td className="p-3 text-center ">
                          <Link
                            to={`/patients/edit/${pat.id}`}
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
                        to={`/patients/view/${pat.id}`}
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