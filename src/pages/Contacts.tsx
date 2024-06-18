import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import TableComponent from "../components/TableComponent";
import Button from "../components/Button";
import { getToken } from "../util/tokenSerivces";
import axiosInstance from "../util/axiosInstance";

const Contacts = () => {
  const navigate = useNavigate();

  const { isLoading, isError } = useQuery("me", async () => {
    const response = await axiosInstance.get("/users/me", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response.data.id);
    return response.data.id;
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <HomeLayout>
      <div className="flex flex-row ">
        <h1 className="text-6xl font-normal italic text-white flex-1 mb-12">
          Contacts
        </h1>
        <div>
          <Button
            children="add new contact"
            onClick={() => {
              navigate("/contacts/new");
            }}
          />
        </div>
      </div>
      <TableComponent />
    </HomeLayout>
  );
};

export default Contacts;
