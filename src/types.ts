import { InputHTMLAttributes } from "react";

export type NewContactsFormData = {
  name: string;
  email: string;
  phoneNumber: string;
  gender: "Male" | "Female";
};

// Login.tsx

export type LoginFormData = {
  email: string;
  password: string;
};

//Register.tsx
export type RegisterFormData = {
  email: string;
  createPassword: string;
  confirmPassword: string;
};

export type RegisterProps = {
  switchToLogin: () => void;
};

//NewContacts.tsx
export type NewContactsProps = {
  firstTime: boolean;
  setIsFirstTime: (value: boolean) => void;
};

//Welcome.tsx
export type WelcomeProps = {
  setIsFirstTime: (value: boolean) => void;
};

//Button.tsx

export type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "colored" | "outlined";
  color?: string;
};


//TextField.tsx

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  isPassword?: boolean;
}

//contact-store.ts

export type ContactStore = {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addToContacts: (contact: Contact) => void;
  removeFromContacts: (id: number) => void;
  updateContact: (updatedContact: Contact) => void;
}

//DeleteInfoModal.tsx
export type DeleteInfoModalProps=  {
  onClose: () => void;
}

//DeleteModal.tsx
export type DeleteModalProps = {
  contactName: string;
  onConfirm: () => void;
  onCancel: () => void;
}


//Other

export type  Contact = {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  email: string;
  phoneNumber: string;
}
