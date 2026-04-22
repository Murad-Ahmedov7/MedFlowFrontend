

import useDepartments from "@/features/departments/hooks/useDepartments";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function AddDepartmentPage() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const { addNewDepartment } = useDepartments();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      await addNewDepartment({ name });
      alert(`"${name}" department added successfully.`);
      navigate("/departments");

    } catch (err:any) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-0">
      <div className="w-[95%] max-w-none mx-auto bg-white shadow-md rounded-lg p-6">

        {/* 🔥 Title */}
        <h2 className="text-xl font-semibold mb-6">Add Department</h2>

        {/* 🔥 Input */}
        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">
            Department Name
          </label>

          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter department name"
          />

          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>

        {/* 🔥 Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>

          <button
            onClick={() => navigate("/departments")}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

