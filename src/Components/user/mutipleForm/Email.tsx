// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { useSelector } from 'react-redux';
// import { fundraiserSignup } from '../../../api/user';
// import { useNavigate } from'react-router-dom';

// const formSchema = z.object({
//   email: z.string().email("Invalid email"),
//   phone: z.string()
//     .refine((value: string) => /^[789]\d{9}$/.test(value), {
//       message: "invalid phone number",
//     }),
// });

// interface FormValues {
//   email: string;
//   phone: string;
// }

// const EmailForm: React.FC = () => {
     
//     const navigate = useNavigate();

//     const { userInfo } = useSelector((state: any) => state.auth);

//   const { register, handleSubmit,setError, formState: { errors } } = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       phone: "",
//     },
//     mode: 'onTouched',
//   });

//   const onSubmit = async(data: FormValues) => {
//     if (data.email !== userInfo.email) {
//         setError('email',{type: "manual", message: "your not verified user"});
//         return;
//       }
//       try {
//         console.log("Form data:", data);
//         const response = await fundraiserSignup(data)
//        if(response?.status === 200){
//          navigate("/otp")
//        }else{
//         alert("something went wrong")
//        }
//       } catch (err) {
//         console.log(err);
//       }
//     console.log('Email:', data.email);
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <div className="mb-5">
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
//             Your email
//           </label>
//           <input
//             type="email"
//             id="email"
//             {...register('email')}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             placeholder="name@flowbite.com"
//             required
//           />
//           {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//         </div>
//         <div className="mb-5">
//           <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
//             phone
//           </label>
//           <input
//             type="phone"
//             id="phone"
//             {...register('phone')}
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             placeholder="number"
//             required
//           />
//           {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
//         </div>
//         <button
//           type="submit"
//           className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmailForm;





import { Input } from "@material-tailwind/react";
import { Button } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SubmitHandler, useForm } from 'react-hook-form';

const schema = z.object({
  amount: z.number().min(1, "Amount must be greater than 0").nonnegative("Amount must be a positive number"),
  name: z.string().nonempty("Name is required"),
  category: z.enum(["medical", "education"]),
  raisingFor: z.string().nonempty("This field is required"),
  relationWithBeneficiary: z.string().optional(),
  hospitalName: z.string().optional(),
  hospitalState: z.string().optional(),
  hospitalDistrict: z.string().optional(),
  hospitalPostalAddress: z.string().optional(),
  hospitalPin: z.string().optional().refine(pin => pin === "" || pin?.length === 6, {
    message: "Pin must be exactly 6 digits",
  }),
  instituteName: z.string().optional(),
  instituteState: z.string().optional(),
  instituteDistrict: z.string().optional(),
  institutePostalAddress: z.string().optional(),
  institutePin: z.string().optional().refine(pin => pin === "" || pin?.length === 6, {
    message: "Pin must be exactly 6 digits",
  }),
}).refine(data => {
  if (data.category === "medical") {
    return data.hospitalName && data.hospitalState && data.hospitalDistrict && data.hospitalPostalAddress && data.hospitalPin;
  }
  if (data.category === "education") {
    return data.instituteName && data.instituteState && data.instituteDistrict && data.institutePostalAddress && data.institutePin;
  }
  return true;
}, {
  message: "Complete all required fields for the selected category",
  path: ["category"]
}).refine(data => data.raisingFor !== "others" || data.relationWithBeneficiary, {
  message: "Relation with beneficiary is required",
  path: ["relationWithBeneficiary"]
});

type FormData = z.infer<typeof schema>;

function Email() {
  const [category, setCategory] = useState<"medical" | "education" | null>(null);
  const [raisingFor, setRaisingFor] = useState<string | null>(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
      name: "",
      category: undefined,
      raisingFor: "",
      relationWithBeneficiary: "",
      hospitalName: "",
      hospitalState: "",
      hospitalDistrict: "",
      hospitalPostalAddress: "",
      hospitalPin: "",
      instituteName: "",
      instituteState: "",
      instituteDistrict: "",
      institutePostalAddress: "",
      institutePin: "",
    }
  });

  useEffect(() => {
    if (category) {
      setValue("category", category);
    }
  }, [category, setValue]);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Filter out keys with empty string values
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        if (data.category === "medical" && key.startsWith("institute")) {
          return false;
        }
        if (data.category === "education" && key.startsWith("hospital")) {
          return false;
        }
        return value !== "";
      })
    );
    console.log("Filtered Form Data:", filteredData);
  };

  const handleCategoryClick = (selectedCategory: "medical" | "education") => {
    setCategory(selectedCategory);
  };

  const handleRaisingForChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRaisingFor(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <p className="text-center mb-4">I am fundraising for:</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="dropdown" className="block text-gray-700 mb-2">Select an option:</label>
            <select
              id="dropdown"
              {...register("raisingFor")}
              className="w-full px-3 py-2 border rounded cursor-pointer"
              onChange={handleRaisingForChange}
            >
              <option value="" disabled>Select an option</option>
              <option value="myself">Myself</option>
              <option value="others">Others</option>
            </select>
            {errors.raisingFor && <p className="text-red-500">{errors.raisingFor.message}</p>}
          </div>
          {raisingFor === "others" && (
            <div className="mb-4">
              <Input
                {...register("relationWithBeneficiary")}
                variant="standard"
                label="Relation with Beneficiary"
                placeholder="Enter relation with beneficiary"
              />
              {errors.relationWithBeneficiary && <p className="text-red-500">{errors.relationWithBeneficiary.message}</p>}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div onClick={() => handleCategoryClick("education")} className={`p-4 rounded cursor-pointer ${category === "education" ? "bg-purple-600 text-white" : "bg-purple-400 text-black"}`}>Education</div>
            <div onClick={() => handleCategoryClick("medical")} className={`p-4 rounded cursor-pointer ${category === "medical" ? "bg-purple-600 text-white" : "bg-purple-400 text-black"}`}>Medical</div>
          </div>
          <div className="mb-4">
            <Input
              {...register("amount", { valueAsNumber: true })}
              variant="standard"
              label="Amount"
              placeholder="Enter Amount"
              type="number"
            />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
          </div>
          <div className="mb-4">
            <Input
              {...register("name")}
              variant="standard"
              label="Name"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Medical */}
          {category === "medical" && (
            <div>
              <div className="mb-4">
                <Input
                  {...register("hospitalName")}
                  variant="standard"
                  label="Hospital Name"
                  placeholder="Enter hospital name"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("hospitalState")}
                  variant="standard"
                  label="Hospital State"
                  placeholder="Enter state"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("hospitalDistrict")}
                  variant="standard"
                  label="Hospital District"
                  placeholder="Enter district"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("hospitalPostalAddress")}
                  variant="standard"
                  label="Hospital Postal Address"
                  placeholder="Enter postal address"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("hospitalPin")}
                  variant="standard"
                  label="Hospital Pin"
                  placeholder="Enter pin"
                />
                {errors.hospitalPin && <p className="text-red-500">{errors.hospitalPin.message}</p>}
              </div>
            </div>
          )}

          {/* Education */}
          {category === "education" && (
            <div>
              <div className="mb-4">
                <Input
                  {...register("instituteName")}
                  variant="standard"
                  label="College/Institute Name"
                  placeholder="Enter institute name"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("instituteState")}
                  variant="standard"
                  label="Institute State"
                  placeholder="Enter state"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("instituteDistrict")}
                  variant="standard"
                  label="Institute District"
                  placeholder="Enter district"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("institutePostalAddress")}
                  variant="standard"
                  label="Institute Postal Address"
                  placeholder="Enter postal address"
                />
              </div>
              <div className="mb-4">
                <Input
                  {...register("institutePin")}
                  variant="standard"
                  label="Institute Pin"
                  placeholder="Enter pin"
                />
                {errors.institutePin && <p className="text-red-500">{errors.institutePin.message}</p>}
              </div>
            </div>
          )}

          {/* Display custom category error */}
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}

          <Button color="secondary" type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Email;
