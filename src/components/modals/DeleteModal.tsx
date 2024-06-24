import React from "react";
import Button from "../Button";
import { DeleteModalProps } from "../../types";

const DeleteModal: React.FC<DeleteModalProps> = ({
  contactName,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white py-8 px-6 rounded-3xl flex flex-col items-center justify-center shadow-lg relative max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Do you want to delete the contact "{contactName}"?
        </h2>
        <div className="flex justify-center mt-4">
          <div className="mr-2">
            <Button onClick={onConfirm}>Confirm</Button>
          </div>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
