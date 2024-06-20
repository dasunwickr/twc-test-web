
import {create} from 'zustand';
import { Contact } from '../types';

export interface ContactStore {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addToContacts: (contact: Contact) => void;
  removeFromContacts: (id: number) => void;
  updateContact: (updatedContact: Contact) => void;
}

const useContactStore = create<ContactStore>((set) => ({
  contacts: [],

  setContacts: (contacts) => set({ contacts }),

  addToContacts: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),

  removeFromContacts: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((contact) => contact.id !== id),
    })),

  updateContact: (updatedContact) =>
    set((state) => ({
      contacts: state.contacts.map((contact) =>
        contact.id === updatedContact.id ? { ...contact, ...updatedContact } : contact
      ),
    })),
}));

export default useContactStore;
