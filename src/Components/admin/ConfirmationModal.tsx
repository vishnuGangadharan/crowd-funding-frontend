import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button as Buttons } from "@nextui-org/react";

interface ConfirmationModalProps {
  buttonText: string;
  title: string;
  message: string;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  buttonText,
  title,
  message,
  onConfirm,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpenModal(false);
  };

  return (
    <>
      <Buttons className={`${buttonText === 'Blocked' ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-700'} `}
      color="danger" variant="light" 
      onClick={() => {
        if (buttonText !== 'Blocked') {
          setOpenModal(true);
        }
      }}
      >
        {buttonText}
      </Buttons>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <p className="mb-5 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleConfirm}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
