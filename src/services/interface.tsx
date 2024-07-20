

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

    name?:string;
    age?:number;
    fundraisingFor?: string;
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
    targetDate?:Date;
    address?:string;
    medicalDetails?: MedicalDetails;
    educationDetails?: EducationDetails;
    instituteName?:string;
    instituteState?:string;
    instituteDistrict?:string;
    institutePostalAddress?:string;
    institutePin?:string;
    profilePic?: File | null;
    bio?: string;
    userAadharNumber?:string;
    panNumber?:string
    heading?:string;
}
