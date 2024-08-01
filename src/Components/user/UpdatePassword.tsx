import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Link,
} from "@nextui-org/react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const UpdatePassword: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    if (field === "current") {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === "new") {
      setShowNewPassword(!showNewPassword);
    } else if (field === "confirm") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Open Modal
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Handle form submission
                onClose();
              }}
            >
              <ModalHeader className="flex flex-col gap-1">Update Password</ModalHeader>
              <ModalBody>
                <div className="mb-4">
                  <label className="block mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      required
                      className="w-full p-2 border rounded"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                      onClick={() => togglePasswordVisibility("current")}
                    >
                      {showCurrentPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      required
                      className="w-full p-2 border rounded"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                      onClick={() => togglePasswordVisibility("new")}
                    >
                      {showNewPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      required
                      className="w-full p-2 border rounded"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                      onClick={() => togglePasswordVisibility("confirm")}
                    >
                      {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </button>
                  </div>
                </div>
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
