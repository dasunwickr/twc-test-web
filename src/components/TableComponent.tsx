import React, { useState } from "react";
import { Icon } from "@iconify/react";
import maleImage from "../assets/table/pic_m.png";
import femaleImage from "../assets/table/pic_f.png";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import useContactStore from "../store/contactStore";
import DeleteModal from "./modals/DeleteModal";
import DeleteInfoModal from "./modals/DeleteInfoModal";
import axiosInstance from "../util/axiosInstance";
import { Contact } from "../types";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [editingContactId, setEditingContactId] = useState<number | null>(null);
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
    const response = await axiosInstance.get<Contact[]>("/contact");
    return response.data;
  }, {
    onSuccess: (data) => {
      if (data.length === 0) {
        navigate("/")
      } else {
        setContacts(data);
      }
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

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
        gender: editedContact.gender === "Male" ? "Female" : "Male",
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4">
      <div className="relative max-h-96 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-52 no-scrollbar">
          <table className="w-full table-fixed">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="text-left">
                <th className="w-1/4"></th>
                <th className="w-1/4">Full Name</th>
                <th className="w-1/6">Gender</th>
                <th className="w-1/4">Email</th>
                <th className="w-1/3">Phone Number</th>
                <th className="w-1/6"></th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((row) => (
                <tr key={row.id} className="hover:bg-gray-100">
                  <td className="p-2">
                    <img
                      src={row.gender === "Male" ? maleImage : femaleImage}
                      alt={row.gender === "Male" ? "Male" : "Female"}
                      className="w-10 h-10 rounded-full place-content-center"
                    />
                  </td>
                  <td className="p-2">
                    {editingContactId === row.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editedContact?.name || ""}
                        onChange={handleChange}
                        className={`w-full  px-2 py-1 focus:outline-none ${editingContactId === row.id
                          ? "border-r-4 border-primary bg-primary-opacity"
                          : ""
                          }`}
                      />
                    ) : (
                      row.name
                    )}
                  </td>
                  <td >
                    {editingContactId === row.id ? (
                      < >
                        <span className="bg-primary-opacity flex items-center py-1"> <span className="mr-2">{editedContact?.gender}</span>
                          <Icon
                            icon="mdi:autorenew"
                            style={{
                              fontSize: "24px",
                              cursor: "pointer",
                              color: "#083F46",
                            }}
                            onClick={toggleGender}
                          /></span>

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
                        className={`w-full  px-2 py-1 focus:outline-none ${editingContactId === row.id
                          ? "border-r-4 border-primary bg-primary-opacity"
                          : ""
                          }`}
                      />
                    ) : (
                      row.email
                    )}
                  </td>
                  <td className="p-2">
                    {editingContactId === row.id ? (
                      <input
                        type="text"
                        name="phoneNumber"
                        value={editedContact?.phoneNumber || ""}
                        onChange={handleChange}
                        className={`w-full px-2 py-1 focus:outline-none ${editingContactId === row.id
                          ? "border-r-4 border-primary bg-primary-opacity"
                          : ""
                          }`}
                      />
                    ) : (
                      row.phoneNumber
                    )}
                  </td>
                  <td className="p-2 flex items-center gap-2">
                    {editingContactId === row.id ? (
                      <button
                        className="px-4 py-1 bg-primary text-white rounded-full min-w-20"
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
        </div>
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
