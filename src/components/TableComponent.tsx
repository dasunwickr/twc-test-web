import React, { useState } from "react";
import { useQuery, useMutation, QueryClient } from "react-query";
import { Icon } from "@iconify/react";
import maleImage from "../assets/table/pic_m.png";
import femaleImage from "../assets/table/pic_f.png";
import axiosInstance from "../util/axiosInstance";
import Button from "./Button";
import { getToken } from "../util/tokenSerivces";

interface Contact {
  id: number;
  name: string;
  gender: string;
  phone_number: string;
}

const fetchContacts = async (): Promise<Contact[]> => {
  const { data } = await axiosInstance.get<Contact[]>("/contact", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return data;
};

const deleteContact = async (contactId: number) => {
  const token = getToken();
  if (!token) {
    throw new Error("Token not found");
  }

  await axiosInstance.delete(`/contact/${contactId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const TableComponent: React.FC = () => {
  const queryClient = new QueryClient();
  const [editingContactId, setEditingContactId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage: number = 3;

  const {
    data: contacts,
    error,
    isLoading,
  } = useQuery<Contact[]>("contact", fetchContacts);

  const deleteContactMutation = useMutation(deleteContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("contact");
    },
    onError: (error: Error) => {
      console.error("Error deleting contact:", error.message);
    },
  });

  const handleDelete = (contactId: number) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContactMutation.mutate(contactId);
    }
  };

  const handleEdit = (contactId: number) => {
    setEditingContactId(contactId);
  };

  const handleSave = () => {
    setEditingContactId(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading contacts</div>;

  const totalPages: number = Math.ceil((contacts!.length || 0) / perPage);
  const paginatedContacts: Contact[] = contacts!.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

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
            <th className="w-1/3">Phone Number</th>
            <th className="w-1"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedContacts.map((row) => (
            <tr key={row.id} className="hover:bg-gray-100">
              <td className="p-2">
                <img
                  src={
                    row.gender.toUpperCase() === "MALE"
                      ? maleImage
                      : femaleImage
                  }
                  alt={row.gender.toUpperCase() === "MALE" ? "Male" : "Female"}
                  style={{ width: 24, height: 24 }}
                />
              </td>
              <td className="p-2">
                {editingContactId === row.id ? (
                  <input type="text" value={row.name} />
                ) : (
                  row.name
                )}
              </td>
              <td className="p-2">
                {editingContactId === row.id ? (
                  <input type="text" value={row.gender} />
                ) : (
                  row.gender
                )}
              </td>
              <td className="p-2">
                {editingContactId === row.id ? (
                  <input type="text" value={row.phone_number} />
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
                      icon="mdi:delete-outline"
                      style={{ fontSize: "24px", cursor: "pointer" }}
                      onClick={() => handleDelete(row.id)}
                    />
                    <Icon
                      icon="mdi:pencil"
                      style={{ fontSize: "24px", cursor: "pointer" }}
                      onClick={() => handleEdit(row.id)}
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <Icon
            icon="mdi:chevron-left"
            className="bg-primary"
            style={{ marginRight: 8 }}
          />
        </button>
        <div>
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          <Icon
            icon="mdi:chevron-right"
            className="bg-primary"
            style={{ marginLeft: 8 }}
          />
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
