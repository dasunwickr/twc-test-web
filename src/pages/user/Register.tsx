import Button from "../../components/Button";
import TextField from "../../components/TextField";
import AuthLayout from "../../layout/AuthLayout";

interface RegisterProps {
  switchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ switchToLogin }) => {
  return (
    <AuthLayout>
      <div className="mx-32 flex-1 flex flex-col h-screen py-32 place-content-evenly">
        <div>
          <h1 className="font-bold text-5xl text-white">Register Now!</h1>
        </div>
        <div className="">
          <form className="flex flex-col">
            <TextField placeholder="e-mail" name="email" isPassword={false} />
            <TextField
              placeholder="create password"
              name="createPassword"
              isPassword={true}
            />
            <TextField
              placeholder="confirm password"
              name="confirmPassword"
              isPassword={true}
            />
          </form>
        </div>
        <div className="flex flex-col ">
          <Button onClick={() => {}}>Register</Button>
        </div>
        <p className="text-xl text-white place-content-end">
          <a className="underline" onClick={switchToLogin}>
            &lt; Back to Login
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
