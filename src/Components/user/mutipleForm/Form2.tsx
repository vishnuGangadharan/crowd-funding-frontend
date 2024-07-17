import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@material-tailwind/react';
import { Button } from '@nextui-org/react';

// Define the schema using Zod
const schemaStep1 = z.object({
  fundraisingFor: z.enum(['myself', 'others'], {
    required_error: "Fundraising type is required",
  }),
  relationWithBeneficiary: z.string().optional(),
  category: z.enum(['education', 'medical'], {
    required_error: "Category is required",
  }),
});

const schemaStep2 = z.object({
  amount: z.number().positive().min(1, "Amount must be greater than zero"),
  name: z.string().min(1, "Name is required"),
  instituteName: z.string().optional(),
  instituteState: z.string().optional(),
  instituteDistrict: z.string().optional(),
  institutePostalAddress: z.string().optional(),
  institutePin: z.string().optional(),
  hospitalName: z.string().optional(),
  hospitalState: z.string().optional(),
  hospitalDistrict: z.string().optional(),
  hospitalPostalAddress: z.string().optional(),
  hospitalPin: z.string().optional(),
}).refine(data => {
  if (data.category === 'education') {
    return data.instituteName && data.instituteState && data.instituteDistrict && data.institutePostalAddress && data.institutePin;
  } else if (data.category === 'medical') {
    return data.hospitalName && data.hospitalState && data.hospitalDistrict && data.hospitalPostalAddress && data.hospitalPin;
  }
  return true;
}, {
  message: "All fields in the selected category must be filled",
  path: ["category"],
});

type Step1Data = z.infer<typeof schemaStep1>;
type Step2Data = z.infer<typeof schemaStep2>;

const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [category, setCategory] = useState<'education' | 'medical' | ''>('');

  const { register: registerStep1, handleSubmit: handleSubmitStep1, setValue: setValueStep1, formState: { errors: errorsStep1 } } = useForm<Step1Data>({
    resolver: zodResolver(schemaStep1),
  });

  const { register: registerStep2, handleSubmit: handleSubmitStep2, formState: { errors: errorsStep2 } } = useForm<Step2Data>({
    resolver: zodResolver(schemaStep2),
  });

  const handleCategoryClick = (selectedCategory: 'education' | 'medical') => {
    setCategory(selectedCategory);
    setValueStep1('category', selectedCategory);  // Set the category value in the form state
  };

  const onSubmitStep1: SubmitHandler<Step1Data> = (data) => {
    setStep1Data({ ...data, category });
    setCurrentStep(2);
  };

  const onSubmitStep2: SubmitHandler<Step2Data> = (data) => {
    const allData = { ...step1Data, ...data };
    console.log(allData);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <p className="text-center mb-4 text-xl font-semibold">Fundraising Details</p>

        {currentStep === 1 && (
          <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
            {/* Fundraising Type Dropdown */}
            <div className="mb-4">
              <label htmlFor="fundraisingFor" className="block text-gray-700 mb-2">I am fundraising for:</label>
              <select
                id="fundraisingFor"
                className="w-full px-3 py-2 border rounded cursor-pointer"
                {...registerStep1('fundraisingFor')}
                onChange={(e) => {
                  setValueStep1('fundraisingFor', e.target.value);
                  if (e.target.value !== 'others') {
                    setValueStep1('relationWithBeneficiary', '');
                  }
                }}
              >
                <option value="">Select an option</option>
                <option value="myself">Myself</option>
                <option value="others">Others</option>
              </select>
              {errorsStep1.fundraisingFor && <span className="text-red-500">{errorsStep1.fundraisingFor.message}</span>}
            </div>

            {/* Relation with Beneficiary Input */}
            {errorsStep1.fundraisingFor?.message === 'others' && (
              <div className="mb-4">
                <Input
                  variant="standard"
                  label="Relation with Beneficiary"
                  placeholder="Enter relation with beneficiary"
                  {...registerStep1('relationWithBeneficiary')}
                />
                {errorsStep1.relationWithBeneficiary && <span className="text-red-500">{errorsStep1.relationWithBeneficiary.message}</span>}
              </div>
            )}

            {/* Categories */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div
                className={`cursor-pointer p-4 rounded-md shadow-md text-center ${category === 'education' ? 'bg-blue-200 border-2 border-blue-400' : 'bg-blue-100'}`}
                onClick={() => handleCategoryClick('education')}
              >
                Education
              </div>
              <div
                className={`cursor-pointer p-4 rounded-md shadow-md text-center ${category === 'medical' ? 'bg-green-200 border-2 border-green-400' : 'bg-green-100'}`}
                onClick={() => handleCategoryClick('medical')}
              >
                Medical
              </div>
            </div>
            {errorsStep1.category && <span className="text-red-500">{errorsStep1.category.message}</span>}

            {/* Next Button */}
            <Button color="secondary" type="submit" className="w-full">
              Next
            </Button>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
            {/* Amount and Name Inputs */}
            <div className="mb-4">
              <Input
                variant="standard"
                label="Amount"
                placeholder="Enter Amount"
                type="number"
                {...registerStep2('amount', { valueAsNumber: true })}
              />
              {errorsStep2.amount && <span className="text-red-500">{errorsStep2.amount.message}</span>}
            </div>
            <div className="mb-4">
              <Input
                variant="standard"
                label="Name"
                placeholder="Enter your name"
                {...registerStep2('name')}
              />
              {errorsStep2.name && <span className="text-red-500">{errorsStep2.name.message}</span>}
            </div>

            {/* Education Inputs */}
            {category === 'education' && (
              <div className="bg-blue-100 p-4 rounded-md shadow-md mb-4">
                <p className="text-lg font-semibold text-center mb-2">Education Details</p>
                <Input
                  variant="standard"
                  label="College/Institute Name"
                  placeholder="Enter institute name"
                  {...registerStep2('instituteName')}
                />
                {errorsStep2.instituteName && <span className="text-red-500">{errorsStep2.instituteName.message}</span>}
                <Input
                  variant="standard"
                  label="Institute State"
                  placeholder="Enter state"
                  {...registerStep2('instituteState')}
                />
                {errorsStep2.instituteState && <span className="text-red-500">{errorsStep2.instituteState.message}</span>}
                <Input
                  variant="standard"
                  label="Institute District"
                  placeholder="Enter district"
                  {...registerStep2('instituteDistrict')}
                />
                {errorsStep2.instituteDistrict && <span className="text-red-500">{errorsStep2.instituteDistrict.message}</span>}
                <Input
                  variant="standard"
                  label="Institute Postal Address"
                  placeholder="Enter postal address"
                  {...registerStep2('institutePostalAddress')}
                />
                {errorsStep2.institutePostalAddress && <span className="text-red-500">{errorsStep2.institutePostalAddress.message}</span>}
                <Input
                  variant="standard"
                  label="Institute Pin"
                  placeholder="Enter pin"
                  {...registerStep2('institutePin')}
                />
                {errorsStep2.institutePin && <span className="text-red-500">{errorsStep2.institutePin.message}</span>}
              </div>
            )}

            {/* Medical Inputs */}
            {category === 'medical' && (
              <div className="bg-green-100 p-4 rounded-md shadow-md mb-4">
                <p className="text-lg font-semibold text-center mb-2">Medical Details</p>
                <Input
                  variant="standard"
                  label="Hospital Name"
                  placeholder="Enter hospital name"
                  {...registerStep2('hospitalName')}
                />
                {errorsStep2.hospitalName && <span className="text-red-500">{errorsStep2.hospitalName.message}</span>}
                <Input
                  variant="standard"
                  label="Hospital State"
                  placeholder="Enter state"
                  {...registerStep2('hospitalState')}
                />
                {errorsStep2.hospitalState && <span className="text-red-500">{errorsStep2.hospitalState.message}</span>}
                <Input
                  variant="standard"
                  label="Hospital District"
                  placeholder="Enter district"
                  {...registerStep2('hospitalDistrict')}
                />
                {errorsStep2.hospitalDistrict && <span className="text-red-500">{errorsStep2.hospitalDistrict.message}</span>}
                <Input
                  variant="standard"
                  label="Hospital Postal Address"
                  placeholder="Enter postal address"
                  {...registerStep2('hospitalPostalAddress')}
                />
                {errorsStep2.hospitalPostalAddress && <span className="text-red-500">{errorsStep2.hospitalPostalAddress.message}</span>}
                <Input
                  variant="standard"
                  label="Hospital Pin"
                  placeholder="Enter pin"
                  {...registerStep2('hospitalPin')}
                />
                {errorsStep2.hospitalPin && <span className="text-red-500">{errorsStep2.hospitalPin.message}</span>}
              </div>
            )}

            {/* Submit Button */}
            <Button color="secondary" type="submit" className="w-full">
              Submit
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
