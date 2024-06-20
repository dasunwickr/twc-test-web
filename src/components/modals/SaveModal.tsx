import React from 'react';
import Button from '../Button';

interface SaveModalProps {
  onClose: () => void;
}

const SaveModal: React.FC<SaveModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Contact Saved!</h2>
        <p className="text-lg">Your contact has been saved successfully.</p>
        <div className='mt-6'>
          <Button onClick={onClose}>Okay</Button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
