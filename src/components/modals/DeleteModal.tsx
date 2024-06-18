import React from "react";
import Button from "../Button";

interface DeleteModalProps {
  contactName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  contactName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
      <div className="bg-white py-8 px-6 rounded-3xl flex flex-col items-center shadow-lg relative max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4">
          Do you want to delete the contact "{contactName}"?
        </h2>
        <div className="flex justify-center mt-4">
          <Button onClick={onConfirm}>Confirm</Button>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
