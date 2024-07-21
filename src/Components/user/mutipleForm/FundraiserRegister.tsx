import React, { useState, useRef } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import { Button } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useSelector } from 'react-redux';
import { RootState } from "../../../redux/store";
import JoditEditor from 'jodit-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fundraisingRegister } from '../../../api/user';
import { step1Schema } from '../../../services/validations/zodValidations';
import { step2Schema , finalStepSchema, step4Schema } from '../../../services/validations/zodValidations';
import { useNavigate } from 'react-router-dom';
import ProfileAndDocsUploader from '../../../pages/MediaUploader';


type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type FinalStepData = z.infer<typeof finalStepSchema>;
type Step4Data = z.infer<typeof step4Schema>;

const MultiStepForm: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  console.log("userInfo",userInfo);
  const currentUserEmail = userInfo?.email
  console.log("currentUserEmail",currentUserEmail);
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [finalStep3, setFInalStep3] = useState<FinalStepData | null>(null);
  const [category, setCategory] = useState<'education' | 'medical' | ''>('');
  const [showRelationInput, setShowRelationInput] = useState(false);
  const [heading, setHeading] = useState<string | null>("");
  const [phone, setPhone] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");

  const [bio, setBio] = useState('');

  const editor = useRef(null);

  const { register: registerStep1, handleSubmit: handleSubmitStep1, setValue: setValueStep1, formState: { errors: errorsStep1 } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fundraisingFor: undefined,
      relationWithBeneficiary: '',
      category: undefined
    }
  });

  const { control, register: registerStep2, handleSubmit: handleSubmitStep2, formState: { errors: errorsStep2 } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema)
  });

  const { register: registerFinalStep, handleSubmit: handleSubmitFinalStep, formState: { errors: errorsFinalStep } } = useForm<FinalStepData>({
    resolver: zodResolver(finalStepSchema)
  });

  const { register: registerStep4, handleSubmit: handleSubmitStep4, setValue: setValueStep4, formState: { errors: errorsStep4 } } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema)
  });

  const handleCategoryClick = (selectedCategory: 'education' | 'medical') => {
    setCategory(selectedCategory);
    setValueStep1('category', selectedCategory);
  };

  const handlHeading= (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.value
    if (file) {
      setHeading(file);
      setValueStep4('heading', file);
    }
  };

  const onSubmitStep1: SubmitHandler<Step1Data> = (data) => {
    if (category === 'education' || category === 'medical') {
      setStep1Data({ ...data, category });
      setCurrentStep(2);
    }
  };

  const onSubmitStep2: SubmitHandler<Step2Data> = (data) => {
    setStep2Data(data);
    setCurrentStep(3);
  };

  const onSubmitFinalStep: SubmitHandler<FinalStepData> = async (data) => {
    setFInalStep3(data)
    setCurrentStep(4);
  };

  const onSubmitStep4: SubmitHandler<Step4Data> = async (data) => {
    const allData = { ...step1Data, ...step2Data,...finalStep3,currentUserEmail, ...data } as { [key: string]: any };
        if (allData.category === 'medical') {
          Object.keys(allData).forEach(key => {
            if (key.startsWith('institute')) {
              delete allData[key];
            }
          });
        } else if (allData.category === 'education') {
          Object.keys(allData).forEach(key => {
            if (key.startsWith('hospital')) {
              delete allData[key];
            }
          });
        }
        console.log("filtered", allData);
       
    
    try {
      const response = await fundraisingRegister(allData);
      console.log("response", response);
      if(response?.status === 200){
        navigate('/profile')
      }
    } catch (error) {
      console.error("Error submitting form data", error);
    }
  }
  
    
  

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
                onChange={(e) => {
                  setValueStep1('fundraisingFor', e.target.value as 'myself' | 'others');
                  setShowRelationInput(e.target.value === 'others');
                }}
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
            </div>
            {errorsStep1.category && <p className="text-red-600">{errorsStep1.category.message}</p>}

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
              <Controller
                control={control}
                name="targetDate"
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select target date"
                    onChange={(date: Date | null) => field.onChange(date)}
                    selected={field.value}
                    minDate={new Date()}
                    className="w-full px-3 py-2 border rounded"
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
                    label="Institute Pin"
                    placeholder="Enter institute pin"
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
                    label="Hospital Pin"
                    placeholder="Enter hospital pin"
                    {...registerStep2('hospitalPin')}
                  />
                  {errorsStep2.hospitalPin && <p className="text-red-600">{errorsStep2.hospitalPin.message}</p>}
                </div>
              </>
            )}

            <div className="flex justify-between">
              <Button onClick={goBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</Button>
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</Button>
            </div>
          </form>
        )}

        {currentStep === 3 && (
          <form onSubmit={handleSubmitFinalStep(onSubmitFinalStep)}>
            <div className="mb-4">
              <Input
                variant="standard"
                label="User Aadhar Number"
                placeholder="Enter Aadhar number"
                {...registerFinalStep('userAadharNumber')}
              />
              {errorsFinalStep.userAadharNumber && <p className="text-red-600">{errorsFinalStep.userAadharNumber.message}</p>}
            </div>

            <div className="mb-4">
              <Input
                variant="standard"
                label="PAN Number"
                placeholder="Enter PAN number"
                {...registerFinalStep('panNumber')}
              />
              {errorsFinalStep.panNumber && <p className="text-red-600">{errorsFinalStep.panNumber.message}</p>}
            </div>

            <div className="flex justify-between">
              <Button onClick={goBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</Button>
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</Button>
            </div>
          </form>
        )}

        {currentStep === 4 && (
          <form onSubmit={handleSubmitStep4(onSubmitStep4)}>
            {/* <div className="mb-4">
              <label className="block text-gray-700 mb-2">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="w-full px-3 py-2 border rounded cursor-pointer"
              />
              {errorsStep4.profilePic && <p className="text-red-600">{errorsStep4.profilePic.message}</p>}
            </div> */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">write a heading</label>
              <input
                onChange={handlHeading}
                className="w-full px-3 py-2 border rounded cursor-pointer"
              />
              {errorsStep4.heading && <p className="text-red-600">{errorsStep4.heading.message}</p>}
            </div> 
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">enter you email</label>
              <input
              
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const content = event.target.value;
                  setEmail(content);
                  setValueStep4('email', content);
                }}
                className="w-full px-3 py-2 border rounded cursor-pointer"
              />
              {errorsStep4.email && <p className="text-red-600">{errorsStep4.email.message}</p>}
            </div> 
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">enter phone number</label>
              <input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const content = event.target.value;
                  setPhone(content);
                  setValueStep4('phone', content); 
                }}
                className="w-full px-3 py-2 border rounded cursor-pointer"
              />
              {errorsStep4.phone && <p className="text-red-600">{errorsStep4.phone.message}</p>}
            </div> 
            

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Bio</label>
              <JoditEditor
                ref={editor}
                value={bio}
                onChange={(content) => {
                  setBio(content);
                  setValueStep4('bio', content);
                }}
              />
              {errorsStep4.bio && <p className="text-red-600">{errorsStep4.bio.message}</p>}
            </div>

            <div className="flex justify-between">
              <Button onClick={goBack} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</Button>
              <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
