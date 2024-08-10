import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { reportPost } from "@/api/user";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

interface ReportModalProps {
  postId: string;
}

const ReportModal: React.FC<ReportModalProps> = ({ postId }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedReason, setSelectedReason] = useState("");
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const [errors, setErrors] = useState<{ reason?: string; comment?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: { reason?: string; comment?: string } = {};
    if (!selectedReason) newErrors.reason = "You need to select a reason";
    if (!comment) newErrors.comment = "Comment is required";
    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData();
    formData.append("userId", userInfo?._id);
    formData.append("postId", postId);
    formData.append("reason", selectedReason);
    formData.append("comment", comment);
    if (file) formData.append("file", file);

    try {
      const response = await reportPost(formData as any);
      onOpenChange();
      if (response?.status === 200) {
        toast.success(response.data.message);
        setSelectedReason("");
        setComment("");
        setImage(null);
        setFile(null);
      }
    } catch (error) {
      console.error("Error reporting post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dropdown label="More options">
        <Dropdown.Item onClick={onOpen}>Report this post</Dropdown.Item>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {onClose => (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <ModalHeader>Report Post</ModalHeader>
              <ModalBody>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Select Reason
                  </label>
                  <select
                    value={selectedReason}
                    onChange={e => setSelectedReason(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="">Select a reason</option>
                    <option value="Spam">Spam</option>
                    <option value="Inappropriate Content">
                      Inappropriate Content
                    </option>
                    <option value="Harassment">Harassment</option>
                    <option value="Scam or Fraud">Scam or Fraud</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.reason && (
                    <p className="text-red-500 text-sm">{errors.reason}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Comments (optional)
                  </label>
                  <textarea
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Write your reason here..."
                  />
                  {errors.comment && (
                    <p className="text-red-500 text-sm">{errors.comment}</p>
                  )}
                </div>
                <div>
                  <p>Upload a file (Optional)</p>
                  <label className="cursor-pointer">
                    {image ? (
                      <img
                        src={image}
                        alt="Selected"
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 flex items-center justify-center rounded-lg bg-gray-200">
                        <svg
                          className="w-12 h-12 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                          ></path>
                        </svg>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportModal;
