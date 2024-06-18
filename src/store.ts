import create from "zustand";

interface Contact {
  id: number;
  name: string;
  gender: string;
  phone_number: string;
  updated_at: string;
  created_at: string;
  user_id: number;
}

interface ContactsStore {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  updateContact: (id: number, updatedContact: Partial<Contact>) => void;
  deleteContact: (id: number) => void;
}

const useContactsStore = create<ContactsStore>((set) => ({
  contacts: [],
  setContacts: (contacts) => set({ contacts }),
  updateContact: (id, updatedContact) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      ),
    })),
  deleteContact: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),
}));

export default useContactsStore;
