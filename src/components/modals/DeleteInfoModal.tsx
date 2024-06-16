import React, { useState } from "react";
import Button from "../Button";

const DeleteInfoModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={handleOpen} children={"Delete Contact"} />

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div className="bg-white py-8 px-6 rounded-3xl flex flex-col items-center shadow-lg relative max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">
              Your contact has been deleted successfully!
            </h2>
            <div className="flex justify-center mt-4">
              <Button children={"Okay"} onClick={handleClose} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteInfoModal;
