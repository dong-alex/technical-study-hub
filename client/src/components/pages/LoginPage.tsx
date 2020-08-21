import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { TextInput, Button, Icon } from "react-materialize";
import NavigationLayout from "../layout/NavigationLayout";
import { useAuthProvider } from "../auth/AuthenticationProvider";
import "../../sass/loginPage.scss";

type LoginPageProps = {};

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { onLogin, onRegister } = useAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleLogin = (event: any) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  const handleRegistration = (event: any) => {
    event.preventDefault();
    onRegister({ name, email, password });
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setEmail(event.target.value);
    } else {
      setEmail("");
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setName(event.target.value);
    } else {
      setName("");
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
      {isRegister ? (
        <form className="form">
          <section className="registration-form">
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
            <TextInput
              icon="person"
              name="name"
              error="Invalid name"
              label="Name"
              onChange={handleNameChange}
              value={name}
            />

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
          <section className="registration-form">
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
          </section>
        </form>
      )}
    </NavigationLayout>
  );
};

export default LoginPage;
