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
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/react-query/queryClient";
import { useParams } from "react-router-dom";

// export default function useDepartments() {
//   const [departments, setDepartments] = useState<DepartmentResponse[]>([]);
//   const [loading, setLoading] = useState(false);

//   const fetchDepartments = async () => {
//     setLoading(true);
//     try {
//       const data = await getDepartments();
//       setDepartments(data);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addNewDepartment = async (data: AddDepartmentRequest) => {
//     setLoading(true);

//     try {
//       const newDep = await addDepartment(data);
//       setDepartments((prev) => [...prev, newDep]);
//       return newDep;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getDepartmentById = async (id: string) => {
//     return await getDepartment(id);
//   };

//   const updateDepartmentById = async (
//     id: string,
//     data: UpdateDepartmentRequest,
//   ) => {
//     setLoading(true);

//     try {
//       const updated = await updateDepartment(id, data);

//       setDepartments((prev) =>
//         prev.map((dep) => (dep.id === id ? updated : dep)),
//       );

//       return updated;
//     } finally {
//       setLoading(false);
//     }
//   };

//     const deleteDepartmentById = async (id: string) => {
//     setLoading(true);

//     try {
//       await deleteDepartment(id);

//       setDepartments(prev =>
//         prev.filter(dep => dep.id !== id)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const deleteDepartmentById = async (id: string) => {
//   //   await deleteDepartment(id);
//   //   setDepartments((prev) => prev.filter((dep) => dep.id !== id));
//   // };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   return {
//     departments,
//     loading,
//     addNewDepartment,
//     getDepartmentById,
//     updateDepartmentById,
//     deleteDepartmentById
//   };
// }

export default function useDepartments() {
  const { id } = useParams();

  const { data: departments = [], isLoading } = useQuery({
    queryKey: ["departments"],
    queryFn: getDepartments,
  });

  const { data: department, isLoading: isDepartmentLoading } = useQuery({
    queryKey: ["department", id],
    queryFn: () => getDepartment(id!),
    enabled: !!id,
  });

  const addDepartmentMutation = useMutation({
    mutationFn: addDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const updateDepartmentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDepartmentRequest }) =>
      updateDepartment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  const deleteDepartmentMutation = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });

  return {
    departments,
    loading: isLoading,

    department,
    departmentLoading: isDepartmentLoading,

    addNewDepartment: addDepartmentMutation.mutateAsync,
    updateDepartmentById: updateDepartmentMutation.mutateAsync,
    deleteDepartmentById: deleteDepartmentMutation.mutateAsync,
  };
}
