import React, { FunctionComponent, useState, ChangeEvent } from "react";
import NavigationLayout from "../layout/NavigationLayout";
import { Button, TextField } from "@material-ui/core";
import { useAuthProvider } from "../auth/AuthenticationProvider";
import SendIcon from "@material-ui/icons/Send";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import InputAdornment from "@material-ui/core/InputAdornment";
import { LoginPageProps } from "../../types";
import "../../sass/loginPage.scss";

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
            <TextField
              label="Email"
              onChange={handleEmailChange}
              value={email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              onChange={handlePasswordChange}
              value={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="name"
              label="Name"
              onChange={handleNameChange}
              value={name}
            />

            <Button
              color="primary"
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleRegistration}
            >
              Sign-up
            </Button>
          </section>
        </form>
      ) : (
        <form className="form">
          <section className="registration-form">
            <h4>Login to your account</h4>
            <TextField
              label="Email"
              onChange={handleEmailChange}
              value={email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              onChange={handlePasswordChange}
              value={password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <section className="button-section">
              <Button
                color="primary"
                variant="contained"
                onClick={handleLogin}
                startIcon={<SendIcon />}
                className="login-button"
              >
                Submit
              </Button>
              <Button
                color="primary"
                variant="contained"
                className="register-button red lighten-3"
                startIcon={<AssignmentIndIcon />}
                onClick={handleRegisterChange}
              >
                Register
              </Button>
            </section>
          </section>
        </form>
      )}
    </NavigationLayout>
  );
};

export default LoginPage;
