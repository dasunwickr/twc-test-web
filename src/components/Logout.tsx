import { useNavigate } from "react-router-dom";
import { removeToken } from "../util/tokenSerivces";

const Logout = () => {
  const navigate = useNavigate();
  const logout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <div onClick={logout}>
      <a href="" className="flex flex-row">
        <div className="mr-1 mt-1">
          <img src="/src/assets/home/logout.png" alt="" />
        </div>
        <p className="flex-1 underline text-3xl text-white ml-2 mb-2">logout</p>
      </a>
    </div>
  );
};

export default Logout;
