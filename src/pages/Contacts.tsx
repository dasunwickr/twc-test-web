import { useNavigate } from "react-router-dom";
import HomeLayout from "../layout/HomeLayout";
import TableComponent from "../components/TableComponent";
import Button from "../components/Button";

const Contacts = () => {
  const navigate = useNavigate();

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
