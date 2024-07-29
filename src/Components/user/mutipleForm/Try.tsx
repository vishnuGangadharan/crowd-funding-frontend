import { Input } from '@material-tailwind/react';
import { Button } from '@nextui-org/react';
import { useState } from 'react';
import * as z from 'zod';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const step1Schema = z.object({
  fundraisingFor: z.enum(['myself', 'others'], {
    required_error: "Fundraising for is required",
  }),
  relationWithBeneficiary: z.string().optional(),
  category: z.enum(['education', 'medical'], {
    required_error: "Category is required",
  }),
}).refine(data => {
  if (data.fundraisingFor === 'others' && !data.relationWithBeneficiary) {
    return false;
  }
  return true;
}, {
  message: "Relation with Beneficiary is required when fundraising for others",
  path: ["relationWithBeneficiary"],
});

const step2Schema = z.object({
  amount: z.number().min(10000, "Amount must be greater than 10000"),
  name: z.string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name must only contain letters and spaces"),
  age: z.number().min(1, "Age must be greater than 0").max(100, "Age must be within 100"),
  gender: z.string().min(4, "Gender is required"),
  address: z.string().min(20, "Address is required"),
  targetDate: z.date().min(new Date(), "Target date must be greater than today"),
  instituteName: z.string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s.-]+$/, "Name must only contain letters, spaces, dots, and hyphens")
    .optional(),
  instituteState: z.string().min(3, "State is too short").optional(),
  instituteDistrict: z.string().min(3, "District is too short").optional(),
  institutePostalAddress: z.string().min(3, "Postal Address is too short").optional(),
  institutePin: z.string()
    .length(6, "Institute PIN must be exactly 6 digits")
    .regex(/^\d{6}$/, "Institute PIN must be exactly 6 digits")
    .optional(),
  hospitalName: z.string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s.-]+$/, "Name must only contain letters, spaces, dots, and hyphens")
    .optional(),
  hospitalState: z.string().min(3, "State is too short").optional(),
  hospitalDistrict: z.string().min(3, "District is too short").optional(),
  hospitalPostalAddress: z.string().min(10, "Postal Address is too short").optional(),
  hospitalPin: z.string()
    .length(6, "Hospital PIN must be exactly 6 digits")
    .regex(/^\d{6}$/, "Hospital PIN must be exactly 6 digits")
    .optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;

const Try = () => {
  const [category, setCategory] = useState<'education' | 'medical' | ''>('');
  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [showRelationInput, setShowRelationInput] = useState(false);

  const { register: registerStep1, handleSubmit: handleSubmitStep1, setValue: setValueStep1, formState: { errors: errorsStep1 } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fundraisingFor: undefined,
      relationWithBeneficiary: '',
      category: undefined,
    },
  });

  const { control, register: registerStep2, handleSubmit: handleSubmitStep2, formState: { errors: errorsStep2 } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
  });

  const handleCategoryClick = (selectedCategory: 'education' | 'medical') => {
    setCategory(selectedCategory);
    setValueStep1('category', selectedCategory);
  };

  const handleFundraisingForChange = (value: 'myself' | 'others') => {
    setValueStep1('fundraisingFor', value);
    if (value === 'others') {
      setShowRelationInput(true);
    } else {
      setShowRelationInput(false);
      setValueStep1('relationWithBeneficiary', '');
    }
  };

  const onSubmitStep1: SubmitHandler<Step1Data> = (data) => {
    if (category === 'education' || category === 'medical') {
      console.log("Submitted data:", data);
      setStep1Data({ ...data, category });
      setCurrentStep(2);
    }
  };

  const onSubmitStep2: SubmitHandler<Step2Data> = (data) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  const goBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <p className="text-center mb-4 text-xl font-semibold">Fundraising Details</p>

        {currentStep === 1 && (
          <form onSubmit={handleSubmitStep1(onSubmitStep1)}>
            <div className="mb-4">
              <label htmlFor="fundraisingFor" className="block text-gray-700 mb-2">I am fundraising for:</label>
              <select
                id="fundraisingFor"
                className="w-full px-3 py-2 border rounded cursor-pointer"
                {...registerStep1('fundraisingFor')}
                onChange={(e) => handleFundraisingForChange(e.target.value as 'myself' | 'others')}
              >
                <option value="">Select an option</option>
                <option value="myself">Myself</option>
                <option value="others">Others</option>
              </select>
              {errorsStep1.fundraisingFor && <p className="text-red-600">{errorsStep1.fundraisingFor.message}</p>}
            </div>

            {showRelationInput && (
              <div className="mb-4">
                <Input
                  variant="standard"
                  label="Relation with Beneficiary"
                  placeholder="Enter relation with beneficiary"
                  {...registerStep1('relationWithBeneficiary')}
                />
                {errorsStep1.relationWithBeneficiary && <p className="text-red-600">{errorsStep1.relationWithBeneficiary.message}</p>}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div
                className={`cursor-pointer p-4 rounded-md shadow-md text-center ${category === 'education' ? 'bg-blue-200 border-2 border-blue-400' : 'bg-blue-100'}`}
                onClick={() => handleCategoryClick('education')}
              >
                Education
              </div>
              <div
                className={`cursor-pointer p-4 rounded-md shadow-md text-center ${category === 'medical' ? 'bg-blue-200 border-2 border-blue-400' : 'bg-blue-100'}`}
                onClick={() => handleCategoryClick('medical')}
              >
                Medical
              </div>
              {errorsStep1.category && <p className="text-red-600">{errorsStep1.category.message}</p>}
            </div>

            <div className="flex justify-between">
              <Button color="primary" type="submit">Next</Button>
            </div>
          </form>
        )}

        {currentStep === 2 && (
          <form onSubmit={handleSubmitStep2(onSubmitStep2)}>
            <div className="mb-4">
              <Input
                variant="standard"
                label="Name"
                placeholder="Enter name"
                {...registerStep2('name')}
              />
              {errorsStep2.name && <p className="text-red-600">{errorsStep2.name.message}</p>}
            </div>

            <div className="mb-4">
              <Input
                variant="standard"
                label="Age"
                placeholder="Enter age"
                type="number"
                {...registerStep2('age', { valueAsNumber: true })}
              />
              {errorsStep2.age && <p className="text-red-600">{errorsStep2.age.message}</p>}
            </div>

            <div className="mb-4">
              <Input
                variant="standard"
                label="Gender"
                placeholder="Enter gender"
                {...registerStep2('gender')}
              />
              {errorsStep2.gender && <p className="text-red-600">{errorsStep2.gender.message}</p>}
            </div>

            <div className="mb-4">
              <Input
                variant="standard"
                label="Address"
                placeholder="Enter address"
                {...registerStep2('address')}
              />
              {errorsStep2.address && <p className="text-red-600">{errorsStep2.address.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="targetDate" className="block text-gray-700 mb-2">Target Date:</label>
              <Controller
                control={control}
                name="targetDate"
                render={({ field }) => (
                  <DatePicker
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    className="w-full px-3 py-2 border rounded cursor-pointer"
                    placeholderText="Select target date"
                  />
                )}
              />
              {errorsStep2.targetDate && <p className="text-red-600">{errorsStep2.targetDate.message}</p>}
            </div>

            <div className="mb-4">
              <Input
                variant="standard"
                label="Amount"
                placeholder="Enter amount"
                type="number"
                {...registerStep2('amount', { valueAsNumber: true })}
              />
              {errorsStep2.amount && <p className="text-red-600">{errorsStep2.amount.message}</p>}
            </div>

            {category === 'education' && (
              <>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Institute Name"
                    placeholder="Enter institute name"
                    {...registerStep2('instituteName')}
                  />
                  {errorsStep2.instituteName && <p className="text-red-600">{errorsStep2.instituteName.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Institute State"
                    placeholder="Enter institute state"
                    {...registerStep2('instituteState')}
                  />
                  {errorsStep2.instituteState && <p className="text-red-600">{errorsStep2.instituteState.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Institute District"
                    placeholder="Enter institute district"
                    {...registerStep2('instituteDistrict')}
                  />
                  {errorsStep2.instituteDistrict && <p className="text-red-600">{errorsStep2.instituteDistrict.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Institute Postal Address"
                    placeholder="Enter institute postal address"
                    {...registerStep2('institutePostalAddress')}
                  />
                  {errorsStep2.institutePostalAddress && <p className="text-red-600">{errorsStep2.institutePostalAddress.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Institute PIN"
                    placeholder="Enter institute PIN"
                    {...registerStep2('institutePin')}
                  />
                  {errorsStep2.institutePin && <p className="text-red-600">{errorsStep2.institutePin.message}</p>}
                </div>
              </>
            )}

            {category === 'medical' && (
              <>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Hospital Name"
                    placeholder="Enter hospital name"
                    {...registerStep2('hospitalName')}
                  />
                  {errorsStep2.hospitalName && <p className="text-red-600">{errorsStep2.hospitalName.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Hospital State"
                    placeholder="Enter hospital state"
                    {...registerStep2('hospitalState')}
                  />
                  {errorsStep2.hospitalState && <p className="text-red-600">{errorsStep2.hospitalState.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Hospital District"
                    placeholder="Enter hospital district"
                    {...registerStep2('hospitalDistrict')}
                  />
                  {errorsStep2.hospitalDistrict && <p className="text-red-600">{errorsStep2.hospitalDistrict.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Hospital Postal Address"
                    placeholder="Enter hospital postal address"
                    {...registerStep2('hospitalPostalAddress')}
                  />
                  {errorsStep2.hospitalPostalAddress && <p className="text-red-600">{errorsStep2.hospitalPostalAddress.message}</p>}
                </div>
                <div className="mb-4">
                  <Input
                    variant="standard"
                    label="Hospital PIN"
                    placeholder="Enter hospital PIN"
                    {...registerStep2('hospitalPin')}
                  />
                  {errorsStep2.hospitalPin && <p className="text-red-600">{errorsStep2.hospitalPin.message}</p>}
                </div>
              </>
            )}

            <div className="flex justify-between">
              <Button color="secondary" onClick={goBack}>Back</Button>
              <Button color="primary" type="submit">Submit</Button>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <div>
            <p className="text-center mb-4 text-xl font-semibold">Summary</p>
            <pre className="bg-gray-200 p-4 rounded">{JSON.stringify({ step1Data, step2Data }, null, 2)}</pre>
            <div className="flex justify-between mt-4">
              <Button color="secondary" onClick={goBack}>Back</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Try;
