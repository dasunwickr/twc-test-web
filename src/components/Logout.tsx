import { Icon } from "@iconify/react";
const Logout = () => {
  return (
    <div>
      <a href="" className="flex flex-row">
        <div className="mr-1 mt-1">
          <Icon icon="mdi-light:logout" className="text-white" />
        </div>
        <p className="flex-1 underline text-2xl text-white ml-2 mb-4">logout</p>
      </a>
    </div>
  );
};

export default Logout;
