import React, { ReactNode } from "react";
import Logout from "../components/Logout";

interface HomeLayoutProps {
  children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url(/src/assets/contact-us.png)",
      }}
    >
      <div
        className="h-full py-24 px-60 "
        style={{
          backgroundImage: "url(/src/assets/home/Ellipse_2.svg)",
          WebkitBackgroundSize: "cover",
        }}
      >
        <div id="x1" className="h-full">
          <img src="/src/assets/home/logo_contactsg.png" alt="" />
          <div className="">
            <div className="mt-8">{children}</div>
          </div>
          <div className="absolute bottom-0 right-0 mb-24 mr-48 text-white text-2xl">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
