export const Gender = {
  Male: 1,
  Female: 2,
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];


export const BloodGroup = {
  Unknown: 0,
  OPlus: 1,
  OMinus: 2,
  APlus: 3,
  AMinus: 4,
  BPlus: 5,
  BMinus: 6,
  ABPlus: 7,
  ABMinus: 8,
} as const;

export type BloodGroup = (typeof BloodGroup)[keyof typeof BloodGroup];


export interface CreatePatientRequest {
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

export interface CreatePatientResponse{
    id:string
}