import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { WelcomeProps } from "../types";

const Welcome: React.FC<WelcomeProps> = ({ setIsFirstTime }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsFirstTime(true);
    navigate("/contacts/new");
  };

  return (
    <div className=" place-content-center">
      <h1 className="text-6xl font-bold text-white ">Welcome,</h1>
      <p className="text-4xl font-normal text-white my-16">
        This is where your contacts will live. Click the button below to add
        a new contact.
      </p>
      <Button onClick={handleButtonClick}>add your first contact</Button>
    </div>
  );
};

export default Welcome;
