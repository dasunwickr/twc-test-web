export type NewContactsFormData = {
  name: string;
  email: string;
  phone_number: string;
  gender: "MALE" | "FEMALE";
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
