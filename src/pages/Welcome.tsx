import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import HomeLayout from "../layout/HomeLayout";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <HomeLayout>
        <div className="my-32 place-content-end">
          <h1 className="text-6xl font-bold text-white">Welcome,</h1>
          <p className="text-4xl font-normal text-white my-28">
            This is where your contacts will live. Click the button below to add
            a new contact.
          </p>
          <Button
            children={"add your first contact"}
            onClick={() => {
              navigate("/contacts/new");
            }}
          />
        </div>
      </HomeLayout>
    </div>
  );
};

export default Welcome;
