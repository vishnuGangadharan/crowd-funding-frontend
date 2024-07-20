import * as z from 'zod';


export const step1Schema = z.object({
    fundraisingFor: z.enum(['myself', 'others'], {
      required_error: "Fundraising for is required",
    }),
    relationWithBeneficiary: z.string().optional(),
    category: z.enum(['education', 'medical'], {
      required_error: "Category is required",
    }),
  });


export const step2Schema = z.object({
    amount: z.number().min(10000, "Amount must be greater than 10000"),
    name: z.string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),
    age: z.number().min(1, "Age must be greater than 0").max(100,"age must be with in 100"),
    gender: z.string().min(4, "require"),
    address: z.string().min(20, "Address is required"),
    targetDate: z.date().min(new Date(), "Target date must be greater than today"),
    instituteName: z.string() .min(1, "Name is required")
    .regex(/^[a-zA-Z\s.-]+$/, "Name must only contain letters, spaces, dots, and hyphens")
    .optional(),
    instituteState: z.string().min(3, "too short").optional(),
    instituteDistrict: z.string().min(3, "too short").optional(),
    institutePostalAddress: z.string().min(3, "too short").optional(),
    institutePin: z.string().length(6, "Hospital PIN must be exactly 6 digits")
    .regex(/^\d{6}$/, "Hospital PIN must be exactly 6 digits")
    .optional(),
    hospitalName: z.string() .min(1, "Name is required")
    .regex(/^[a-zA-Z\s.-]+$/, "Name must only contain letters, spaces, dots, and hyphens")
    .optional(),
    hospitalState: z.string().min(3, "too short").optional(),
    hospitalDistrict: z.string().min(3, "too short").optional(),
    hospitalPostalAddress: z.string().min(10, "too short").optional(),
    hospitalPin: z.string()
    .length(6, "Hospital PIN must be exactly 6 digits")
    .regex(/^\d{6}$/, "Hospital PIN must be exactly 6 digits")
    .optional(),
    
  });

  export const finalStepSchema = z.object({
    userAadharNumber: z.string().min(12, "Aadhar number must be 12 digits").max(12, "Aadhar number must be 12 digits"),
    panNumber: z.string().min(10, "PAN number must be 10 characters").max(10, "PAN number must be 10 characters"),
  });
  
  export const step4Schema = z.object({
    heading: z.string().min(10, "need atleast 10 letters"),
    bio: z.string().min(1, "Bio is required"),
    email:z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(10, "Phone number must be at most 10 digits"),
  });