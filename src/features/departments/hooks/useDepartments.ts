import { useEffect, useState } from "react";
import type {
  AddDepartmentRequest,
  DepartmentResponse,
  UpdateDepartmentRequest,
} from "../types/department.types";
import {
  addDepartment,
  deleteDepartment,
  getDepartment,
  getDepartments,
  updateDepartment,
} from "../services/departmentsService";

export default function useDepartments() {
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const data = await getDepartments();
      setDepartments(data);
    } finally {
      setLoading(false);  
    }
  };

  const addNewDepartment = async (data: AddDepartmentRequest) => {
    setLoading(true);

    try {
      const newDep = await addDepartment(data);
      setDepartments((prev) => [...prev, newDep]);
      return newDep;
    } finally {
      setLoading(false);
    }
  };

  const getDepartmentById = async (id: string) => {
    return await getDepartment(id);
  };

  const updateDepartmentById = async (
    id: string,
    data: UpdateDepartmentRequest,
  ) => {
    setLoading(true);

    try {
      const updated = await updateDepartment(id, data);

      setDepartments((prev) =>
        prev.map((dep) => (dep.id === id ? updated : dep)),
      );

      return updated;
    } finally {
      setLoading(false);
    }
  };

    const deleteDepartmentById = async (id: string) => {
    setLoading(true);

    try {
      await deleteDepartment(id);

      setDepartments(prev =>
        prev.filter(dep => dep.id !== id)
      );
    } finally {
      setLoading(false);
    }
  };

  // const deleteDepartmentById = async (id: string) => {
  //   await deleteDepartment(id);
  //   setDepartments((prev) => prev.filter((dep) => dep.id !== id));
  // };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return {
    departments,
    loading,
    addNewDepartment,
    getDepartmentById,
    updateDepartmentById,
    deleteDepartmentById
  };
}



