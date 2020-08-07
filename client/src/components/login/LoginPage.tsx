import React, {
  FunctionComponent,
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import "../../sass/loginPage.scss";
import NavigationLayout from "../navigation/NavigationLayout";
import { useAuthProvider } from "../auth/AuthenticationProvider";
import { TextInput, Button, Icon } from "react-materialize";

type LoginPageProps = {};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { onLogin, onRegister, onLogout } = useAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleLogin = (event: any) => {
    event.preventDefault();
    onLogin({ email, password });
    console.log("Attempting to login");
  };

  const handleRegistration = (event: any) => {
    event.preventDefault();
    onRegister({ email, password });
    console.log("Attempting to register new user");
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setEmail(event.target.value);
    } else {
      setEmail("");
    }
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setPassword(event.target.value);
    } else {
      setPassword("");
    }
  };

  const handleRegisterChange = (event: any) => {
    event.preventDefault();
    setIsRegister(true);
  };

  return (
    <NavigationLayout>
      <div id="login-container">
        {isRegister ? (
          <form className="form">
            <h4>No account? Register here</h4>
            <TextInput
              icon="email"
              name="email"
              label="Email"
              onChange={handleEmailChange}
              value={email}
              validate
              email
            />
            <TextInput
              icon="enhanced_encryption"
              name="password"
              label="Password"
              onChange={handlePasswordChange}
              value={password}
              password
            />
            <section className="button-section">
              <Button
                node="button"
                waves="light"
                className="register-button light-blue lighten-2"
                onClick={handleRegistration}
              >
                Sign-up
                <Icon right>send</Icon>
              </Button>
            </section>
          </form>
        ) : (
          <form className="form">
            <h4>Login to your account</h4>
            <TextInput
              icon="email"
              name="email"
              error="Invalid email"
              label="Email"
              onChange={handleEmailChange}
              value={email}
              validate
              email
            />
            <TextInput
              icon="enhanced_encryption"
              name="password"
              label="Password"
              onChange={handlePasswordChange}
              value={password}
              password
            />
            <section className="button-section">
              <Button
                waves="light"
                onClick={handleLogin}
                className="login-button light-blue lighten-2"
              >
                Submit
                <Icon right tiny>
                  send
                </Icon>
              </Button>
              <Button
                waves="light"
                className="register-button red lighten-3"
                onClick={handleRegisterChange}
              >
                Register
                <Icon right tiny>
                  assignment
                </Icon>
              </Button>
            </section>
          </form>
        )}
      </div>
    </NavigationLayout>
  );
};

export default LoginPage;
