import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  return (
    <div>
      <AuthLayout
        children={
          <div className="mx-32 flex-1 flex flex-col h-screen">
            <div className="">
              <h1 className="font-bold text-5xl text-white">Hi there,</h1>
              <h2 className="font-semibold text-3xl text-white w-56">
                Welcome to our contacts portal
              </h2>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Login;
