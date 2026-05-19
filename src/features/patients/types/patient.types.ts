export const Gender = {
  Male: "Male",
  Female: "Female",
} as const;

export type Gender =
  (typeof Gender)[keyof typeof Gender];


export const BloodGroup = {
  Unknown: "Unknown",

  OPlus: "OPlus",
  OMinus: "OMinus",

  APlus: "APlus",
  AMinus: "AMinus",

  BPlus: "BPlus",
  BMinus: "BMinus",

  ABPlus: "ABPlus",
  ABMinus: "ABMinus",
} as const;

export type BloodGroup =
  (typeof BloodGroup)[keyof typeof BloodGroup];


export interface AddPatientRequest {
  firstName: string;
  lastName: string;
  fin: string;
  phone: string;
  address?: string;
  birthDate: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  allergies?: string;
}

export interface UpdatePatientRequest {
  firstName: string;
  lastName: string;
  fin: string;
  phone: string;
  address?: string;
  birthDate: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  allergies?: string;
}

export interface AddPatientResponse {
    id:string
}

export interface PatientResponse {
  id: string;
  firstName: string;
  lastName: string;
  fin: string;
  phone: string;
  address?: string;
  birthDate: string;
  gender: Gender;
  bloodGroup: BloodGroup;
  allergies?: string;
  createdAt: string;
}
