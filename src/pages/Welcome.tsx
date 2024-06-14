import Logout from "../components/Logout";

const Welcome = () => {
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: "url(src/assets/contact-us.png)",
      }}
    >
      <div
        className="h-full py-24 px-48"
        style={{
          backgroundImage: "url(src/assets/home/Ellipse_2.svg)",
          WebkitBackgroundSize: "cover",
        }}
      >
        <div>
          <img src="src/assets/home/logo_contactsg.png" alt="" />
          <div className="absolute bottom-0 right-0 mb-24 mr-48 text-white text-2xl">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
