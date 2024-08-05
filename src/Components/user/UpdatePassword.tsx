import React, { FormEvent, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
} from "@nextui-org/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { updatePassword } from "@/api/user";
import { PasswordData, PasswordVisibility } from "@/services/interface/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {toast}  from 'react-toastify'



const UpdatePassword: React.FC = () => {

  const { userInfo } = useSelector((state:RootState)=> state.auth)
  let userId = userInfo._id
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState<PasswordVisibility>({
    current: false,
    new: false,
    confirm: false,
  });
  const [errors, setErrors] = useState<Partial<PasswordData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field: keyof PasswordVisibility) => {
    setShowPassword((prevShow) => ({
      ...prevShow,
      [field]: !prevShow[field],
    }));
  };

  const validate = () => {
    const newErrors: Partial<PasswordData> = {};
    if (!passwordData.currentPassword) newErrors.currentPassword = "Current password is required";
    if (!passwordData.newPassword) newErrors.newPassword = "New password is required";
    if (!passwordData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    if (passwordData.newPassword !== passwordData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await updatePassword(passwordData,userId);
      if ( response && response.status == 200) {
       toast.success(response.data.message);

        console.log("Password updated successfully", response);
      }
    } catch (error) {
      console.log("An error occurred", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-indigo-500 text-white px-4 py-2 rounded">
        Change password
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                // onClose();
              }}
            >
              <ModalHeader className="flex flex-col gap-1">Update Password</ModalHeader>
              <ModalBody>
                {(["currentPassword", "newPassword", "confirmPassword"] as (keyof PasswordData)[]).map((field, idx) => (
                  <div className="mb-4" key={idx}>
                    <label className="block mb-2">
                      {field === "currentPassword"
                        ? "Current Password"
                        : field === "newPassword"
                        ? "New Password"
                        : "Confirm Password"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword[field as keyof PasswordVisibility] ? "text" : "password"}
                        name={field}
                        placeholder={`Enter ${field === "currentPassword" ? "current" : field === "newPassword" ? "new" : "confirm"} password`}
                        value={passwordData[field]}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-2 flex items-center"
                        onClick={() => togglePasswordVisibility(field as keyof PasswordVisibility)}
                      >
                        {showPassword[field as keyof PasswordVisibility] ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                      {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
                    </div>
                  </div>
                ))}
                <div className="flex py-2 px-1 justify-between">
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Update Password
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePassword;
