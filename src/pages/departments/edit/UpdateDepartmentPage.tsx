import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useDepartments from "@/features/departments/hooks/useDepartments";
import { useTranslation } from "react-i18next";

export default function UpdateDepartmentPage() {
  // const { id } = useParams();
  // const navigate = useNavigate();

  // const { getDepartmentById, updateDepartmentById } = useDepartments();
  // const { t } = useTranslation();

  // const [name, setName] = useState("");
  // const [imageUrl, setImageUrl] = useState<string | null>(null);
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  // // 🔥 GET BY ID (page açılarkən)
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!id) return;

  //     try {
  //       const data = await getDepartmentById(id);
  //       setName(data.name);
  //       setImageUrl(data.imageUrl ?? null);
  //     } catch {
  //       setError(t("errors.loadFailed"));
  //     }
  //   };

  //   fetchData();
  // },[id]);

  // // 🔥 SAVE (PUT)
  // const handleUpdate = async () => {
  //   if (!id) {
  //     alert(t("errors.invalidId"));
  //     return;
  //   }

  //   if (!name.trim()) {
  //     setError(t("errors.required"));
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     await updateDepartmentById(id, {
  //       name,
  //       imageUrl,
  //     });
  //     alert(t("departments.updated", { name }));
  //     navigate("/departments");
  //   } catch (err: any) {
  //     alert(err?.message || t("errors.updateFailed"));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { department, departmentLoading, updateDepartmentById } =
    useDepartments();

  // form state (yalnız UI üçün)
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 TanStack data gələndə form doldururuq
  useEffect(() => {
    if (department) {
      setName(department.name);
      setImageUrl(department.imageUrl ?? null);
    }
  }, [department]);

  // 🔥 UPDATE
  const handleUpdate = async () => {
    if (!id) {
      alert(t("errors.invalidId"));
      return;
    }

    if (!name.trim()) {
      setError(t("errors.required"));
      return;
    }

    try {
      setLoading(true);

      await updateDepartmentById({
        id,
        data: {
          name,
          imageUrl,
        },
      });

      alert(t("departments.updated", { name }));
      navigate("/departments");
    } catch (err: any) {
      alert(err?.message || t("errors.updateFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-0">
      <div className="w-[95%] mx-auto bg-white shadow-md rounded-lg p-6">
        {/* 🔥 Title */}
        <h2 className="text-xl font-semibold mb-6">{t("departments.edit")}</h2>

        {/* 🔥 Name */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            {t("departments.name")}
          </label>

          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* 🔥 ImageUrl */}
        {/* <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Image URL
          </label>

          <input
            value={imageUrl ?? ""}
            onChange={(e) => setImageUrl(e.target.value || null)}
            className="w-full border p-2 rounded-md focus:ring-2 focus:ring-cyan-500"
            placeholder="Optional"
          />
        </div> */}
        {/* add ucun de bele optional yaz?? */}

        {/* 🔥 Error */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        {/* 🔥 Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleUpdate}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
          >
            {loading ? t("common.updating") : t("common.update")}
          </button>

          <button
            onClick={() => navigate("/departments")}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
          >
            {t("common.cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
