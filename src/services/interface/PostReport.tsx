import beneficiary from "./beneficiary";
import { userFormData } from "./user";

export interface PostReport {
    postId?: beneficiary
    reason?: string;
    comment?: string;
    count?: number;
    _id: any;
    fundraiser: string;
    fundraisingFor: string;
    category: string;
    relationWithBeneficiary?: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    isApproved: boolean;
    phone: string;
    panNumber: string;
    userAadharNumber: string;
    profilePic: string;
    supportingDocs: string[];
    amount: number;
    contributedAmount: number;
    targetDate: string;
    address: string;
    heading: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    blocked: boolean;
    userId:userFormData
    image?: string;
  
}

export interface PaymentData  {
    amount?: number,
    anonymousName?: string ,
    userId?: string,
    beneficiaryId?: string,
    method?: string
  };