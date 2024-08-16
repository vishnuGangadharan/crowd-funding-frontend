import { userFormData } from "./user";

export interface form1Types{
    email: string,
    name: string,
    phone: string,
    option: string,
    amount: number,
    category: string,
    haspitalName: string,
    hospitalAddress: string,
}





interface MedicalDetails {
    hospitalName?: string;
    district?:string;
    state?:string;
    city?: string;
    postalCode?: string;
}

interface EducationDetails {
    schoolName?: string;
    district?:string;
    state?:string;
    city?: string
    postalCode?: string;
}


export interface beneficiary{
    _id?:string ;
    name?:string |null;
    age?:number;
    isApproved:'approved' | 'pending' | 'rejected' | string;
    fundraisingFor?: string;
    fundraiser : form1Types;
    relationWithBeneficiary?:string
    category?:string
    email?:string;
    phone?:string;
    pan_Card?:string;
    aadhar?: string;
    description?: string;
    documents?:string;
    amount?:number;
    contributedAmount?:string;
    isVerified?:true;
    createdAt?:Date;
    startDate?:Date;
    targetDate?: any;
    supportingDocs:File;
    address?:string;
    medicalDetails?: MedicalDetails;
    educationDetails?: EducationDetails;
    instituteName?:string;
    instituteState?:string;
    instituteDistrict?:string;
    institutePostalAddress?:string;
    institutePin?:string;
    profilePic?: File[] | null | string;
    bio?: string;
    userAadharNumber?:string;
    panNumber?:string
    heading?:string;
}


export interface chatInterface { 
    _id?:string;
    senderId?:string;
    receiverId?:string;
    message?:string;
    createdAt?:Date ;
    updatedAt?:Date;
    timestamp?: Date;
}

export interface updateData{
    updateFiles:File[] | null | string;
    content : string
}



export interface updates {
    content?: string;
    postId?: string;
    image?: string[];
    video?: string[];
  }