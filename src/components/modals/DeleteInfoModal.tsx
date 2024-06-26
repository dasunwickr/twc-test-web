import React from "react";
import Button from "../Button";
import { DeleteInfoModalProps } from "../../types";



const DeleteInfoModal: React.FC<DeleteInfoModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white py-8 px-6 rounded-3xl flex flex-col items-center shadow-lg relative max-w-xl w-full">
        <h2 className="text-xl font-semibold mb-4">Contact Deleted</h2>
        <p>The contact has been successfully deleted.</p>
        <div className="flex justify-center mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteInfoModal;
