// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { staffService } from "../services/staff.service";
// import type {
//   CreateDoctorRequest,
//   CreateReceptionistRequest,
// } from "../types/staff.types";

import { useMutation } from "@tanstack/react-query";
import { staffService } from "../services/staff.service";

// export default function useStaff() {
//   const queryClient = useQueryClient();

//   const createDoctorMutation = useMutation({
//     mutationFn: staffService.createDoctor,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["staff"] });
//     },
//   });

//   const createReceptionistMutation = useMutation({
//     mutationFn: staffService.createReceptionist,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["staff"] });
//     },
//   });

//   return {
//     createDoctor: createDoctorMutation.mutateAsync,
//     createReceptionist: createReceptionistMutation.mutateAsync,

//     creatingDoctor: createDoctorMutation.isPending,
//     creatingReceptionist: createReceptionistMutation.isPending,
//   };
// }


export default function useStaff() {
  const createDoctorMutation = useMutation({
    mutationFn: staffService.createDoctor,
  });

  const createReceptionistMutation = useMutation({
    mutationFn: staffService.createReceptionist,
  });

  return {
    createDoctor: createDoctorMutation.mutateAsync,
    createReceptionist: createReceptionistMutation.mutateAsync,

    creatingDoctor: createDoctorMutation.isPending,
    creatingReceptionist: createReceptionistMutation.isPending,
  };
}

//helelik get yoxdu deye budur kod qalsin. olanda yuxarindaki olani yaz