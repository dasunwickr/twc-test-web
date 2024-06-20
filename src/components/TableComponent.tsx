import React, { useState } from "react";
import { Icon } from "@iconify/react";
import maleImage from "../assets/table/pic_m.png";
import femaleImage from "../assets/table/pic_f.png";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import useContactStore from "../store/contact-store";
import DeleteModal from "./modals/DeleteModal";
import DeleteInfoModal from "./modals/DeleteInfoModal";
import axiosInstance from "../util/axiosInstance";
import { getToken } from "../util/tokenSerivces";
import { Contact } from "../types";

const deleteContact = async (contactId: number) => {
  const response = await axiosInstance.delete(`/contact/${contactId}`);
  return response.data;
};

const updateContact = async (updatedContact: Contact) => {
  const response = await axiosInstance.patch(`/contact/${updatedContact.id}`, updatedContact);
  return response.data;
};

const TableComponent: React.FC = () => {
  const { contacts, setContacts, removeFromContacts, updateContact: updateContactInStore } = useContactStore();
  const queryClient = useQueryClient();

  const perPage: number = 3;

  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [contactToDelete, setContactToDelete] = useState<Contact | null>(null);
  const [showDeleteInfoModal, setShowDeleteInfoModal] = useState(false);
  const [editedContact, setEditedContact] = useState<Contact | null>(null);

  
  const removeContactMutation = useMutation(deleteContact, {
    onSuccess: (removedContact) => {
      queryClient.invalidateQueries('contacts');
      setShowDeleteInfoModal(true);
      removeFromContacts(removedContact); 
    },
  });

  
  const updateContactMutation = useMutation(updateContact, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('contacts');
      setEditingContactId(null);
      setEditedContact(null);
      updateContactInStore(data); 
    },
  });

  const { isLoading, isError } = useQuery("contacts", async () => {
    const response = await axiosInstance.get<Contact[]>("/contact", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  }, {
    onSuccess: (data) => {
      setContacts(data); 
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const totalPages: number = Math.ceil((contacts.length || 0) / perPage);
  const paginatedContacts: Contact[] = contacts.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleDelete = (contact: Contact) => {
    setContactToDelete(contact);
  };

  const handleConfirmDelete = () => {
    if (contactToDelete) {
      removeContactMutation.mutate(contactToDelete.id);
      setContactToDelete(null);
    }
  };

  const handleEdit = (contact: Contact) => {
    setEditingContactId(contact.id);
    setEditedContact({ ...contact });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedContact) {
      setEditedContact({
        ...editedContact,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSave = () => {
    if (editedContact) {
      updateContactMutation.mutate(editedContact);
    }
  };

  const toggleGender = () => {
    if (editedContact) {
      setEditedContact({
        ...editedContact,
        gender: editedContact.gender === "MALE" ? "FEMALE" : "MALE",
      });
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="bg-white rounded-3xl p-4">
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="w-1/4"></th>
            <th className="w-1/4">Full Name</th>
            <th className="w-1/6">Gender</th>
            <th className="w-1/4">Email</th>
            <th className="w-1/3">Phone Number</th>
            <th className="w-1"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedContacts.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="p-2">
                <img
                  src={row.gender === "MALE" ? maleImage : femaleImage}
                  alt={row.gender === "MALE" ? "Male" : "Female"}
                  style={{ width: 24, height: 24 }}
                />
              </td>
              <td className="p-2">
                {editingContactId === row.id ? (
                  <input
                    type="text"
                    name="name"
                    value={editedContact?.name || ""}
                    onChange={handleChange}
                  />
                ) : (
                  row.name
                )}
              </td>
              <td className="p-2 flex items-center">
                {editingContactId === row.id ? (
                  <>
                    {editedContact?.gender}
                    <Icon
                      icon="mdi:autorenew"
                      style={{
                        fontSize: "24px",
                        cursor: "pointer",
                        marginLeft: "8px",
                      }}
                      onClick={toggleGender}
                    />
                  </>
                ) : (
                  row.gender
                )}
              </td>
              <td className="p-2">
                {editingContactId === row.id ? (
                  <input
                    type="text"
                    name="email"
                    value={editedContact?.email || ""}
                    onChange={handleChange}
                  />
                ) : (
                  row.email
                )}
              </td>
              <td className="p-2">
                {editingContactId === row.id ? (
                  <input
                    type="text"
                    name="phone_number"
                    value={editedContact?.phone_number || ""}
                    onChange={handleChange}
                  />
                ) : (
                  row.phone_number
                )}
              </td>
              <td className="p-2 flex gap-2">
                {editingContactId === row.id ? (
                  <button
                    className="p-3 bg-primary rounded-full text-white min-w-20"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                ) : (
                  <>
                  
                  <Icon
                      icon="mdi:pencil"
                      style={{ fontSize: "24px", cursor: "pointer" }}
                      onClick={() => handleEdit(row)}
                    />
                    <Icon
                      icon="mdi:trash-can-outline"
                      style={{ fontSize: "24px", cursor: "pointer" }}
                      onClick={() => handleDelete(row)}
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
      {contactToDelete && (
        <DeleteModal
          contactName={contactToDelete.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setContactToDelete(null)}
        />
      )}
      {showDeleteInfoModal && (
        <DeleteInfoModal onClose={() => setShowDeleteInfoModal(false)} />
      )}
    </div>
  );
};

export default TableComponent;
