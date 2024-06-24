import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import TableComponent from "../components/TableComponent";
import Button from "../components/Button";
import axiosInstance from "../util/axiosInstance";
import useContactStore from "../store/contactStore";
import { Contact } from "../types";

const fetchContacts = async (): Promise<Contact[]> => {
  const response = await axiosInstance.get<Contact[]>("/contact");
  return response.data;
};

const Contacts: React.FC = () => {
  const navigate = useNavigate();
  const { setContacts } = useContactStore();

  // const { isLoading, isError } = useQuery("me", async () => {
  //   const response = await axiosInstance.get("/users/me");
  //   console.log(response.data.id);
  //   return response.data.id;
  // });

  const { isLoading: isContactsLoading, isError: isContactsError } = useQuery(
    "contacts",
    fetchContacts,
    {
      onSuccess: (data) => {
        setContacts(data);
      },
    }
  );

  if (isContactsLoading) return <p>Loading...</p>;
  if (isContactsError) return <p>Error fetching data</p>;

  return (
    <><div className="flex flex-row">
    <h1 className="text-6xl font-normal italic text-white flex-1 mb-12">
      Contacts
    </h1>
    <div>
      <Button onClick={() => navigate("/contacts/new")}>
        Add New Contact
      </Button>
    </div>
  </div>
  <TableComponent /></>
      
  );
};

export default Contacts;
