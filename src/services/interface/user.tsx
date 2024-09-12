import { beneficiary } from "./interface";

export interface userFormData {
  _id?: string | null;
    name?: string;
    email?: string;
    mobile?: string;
    password?: string;
    confirmPassword?: string;
    profilePicture?: any;
    newPassword?: string | undefined;
    phone?:string;
    image?: string;
  }


  export interface PasswordData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
  
  export interface PasswordVisibility {
    current: boolean;
    new: boolean;
    confirm: boolean;
  }
  export interface Donation {
    id?: string;
    anonymousName?: string;
    email?: string;
    amount?: number;
    userId?: userFormData;
    beneficiaryId?:string,
    method?: string;
}


export interface walletType{
  userId: userFormData;
  balance:number;
  transactions: {
      beneficiary: beneficiary;
      description: string;
      type: string; //debit/credit
      amount: number;
  }[];
}