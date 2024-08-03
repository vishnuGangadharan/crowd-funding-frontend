

import React from "react";
import { Dropdown } from "flowbite-react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

const ReportModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReason, setSelectedReason] = React.useState("");
  const [comment, setComment] = React.useState("");

  return (
    <>
      <Dropdown label="">
        <Dropdown.Item onClick={onOpen}>Report this post</Dropdown.Item>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
                <form className="flex flex-col gap-4">
              <ModalHeader className="flex flex-col gap-1">Report Post</ModalHeader>
              <ModalBody>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select Reason</label>
                    <select onChange={(e)=> setSelectedReason(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                      <option>Spam</option>
                      <option>Inappropriate Content</option>
                      <option>Harassment</option>
                      <option>Scam or Fraud</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Additional Comments</label>
                    <textarea
                    //   rows={4}
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Write your reason here..."
                      onChange={(e)=>setComment(e.target.value)}
                    ></textarea>
                  </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" onPress={onClose}>
                  Submit
                </Button>
              </ModalFooter>
                </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportModal;
