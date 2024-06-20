
import {create} from 'zustand';
import { ContactStore } from '../types';



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
