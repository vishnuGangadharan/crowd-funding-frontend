import { userFormData } from "./user";





interface MedicalDetails {
    hospitalName: string;
    hospitalDistrict:string;
    hospitalState:string;
    hospitalPostalAddress: string;
    hospitalPin: string;
}

interface EducationDetails {
    instituteName: string;
    instituteDistrict:string;
    instituteState:string;
    institutePostalAddress: string
    institutePin: string;
}


interface beneficiary{
    _id?: string;
    fundraiser?:userFormData;
    name?:string;
    age?:number;
    isApproved?:string;
    email?:string;
    phone?:string;
    gender?:string;
    panNumber?:string;
    userAadharNumber?: string;
    description?: string;
    profilePic?: string[];
    documents?:string;
    amount?:number;
    contributedAmount?:string;
    isVerified?:true;
    createdAt?:Date;
    startDate?:Date;
    targetDate?:Date;
    address?:string;
    heading?:string;
    medicalDetails?: MedicalDetails;
    educationDetails?: EducationDetails;
    relationWithBeneficiary?:string;
    fundraisingFor?:string;
    category?:string;
    bio?:string | undefined;
    supportingDocs:string[];
}
export default beneficiary