
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div
      className="relative flex h-screen overflow-hidden"
      style={{
        backgroundImage: "url(/src/assets/contact-us.png)",
        backgroundPosition: "right",
      }}
    >
      <div className="relative flex-none" style={{ flex: 7 }}>
        <img
          src="/src/assets/user/Ellipse_1.svg"
          className="object-cover h-full w-full absolute top-0 left-0 z-10" 
        />   
      
        <div className="relative z-20"> 
          <Outlet />
        </div>
      </div>

      <div className="flex justify-center flex-col" style={{ flex: 4 }}>
        <div className="ml-20 mb-10">
          <img src="/src/assets/Logo.svg" alt="Logo" />
          <h1 className="text-7xl font-bold text-primary">contacts</h1>
          <h2 className="text-7xl font-semibold text-primary">portal</h2>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
