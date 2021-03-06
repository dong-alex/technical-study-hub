import React, { FunctionComponent, useState, ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import NavigationLayout from "../layout/NavigationLayout";
import styled from "styled-components";
import {
  Button,
  TextField,
  InputAdornment,
  Divider,
  Typography,
} from "@material-ui/core";
import { useAuthProvider } from "../auth/AuthenticationProvider";
import SendIcon from "@material-ui/icons/Send";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import { LoginPageProps } from "../../types";

const ButtonContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Headline = styled(Typography)`
  padding: 1rem 0;
  text-align: center;
`;

const StyledButton = styled(Button)`
  margin: 1rem 0;
`;

const RegistrationForm = styled.section`
  display: flex;
  width: fit-content;
  flex-direction: column;
  justify-content: space-evenly;
  margin: auto;
  padding-bottom: 1rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  const { onLogin } = useAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleLogin = (event: any) => {
    event.preventDefault();
    onLogin({ email, password });
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

  return (
    <NavigationLayout>
      <form className="form">
        <Headline variant="h4">Login to your account</Headline>
        <RegistrationForm>
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
              type: "password",
            }}
          />
          <ButtonContainer>
            <Button
              color="primary"
              variant="contained"
              onClick={handleLogin}
              startIcon={<SendIcon />}
            >
              Login
            </Button>
          </ButtonContainer>
          <Divider />
          <Headline>No account yet? Register here.</Headline>
          <ButtonContainer>
            <NavLink
              to="/register"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                color="primary"
                variant="contained"
                startIcon={<AssignmentIndIcon />}
                style={{ width: "100%" }}
              >
                Register
              </Button>
            </NavLink>
          </ButtonContainer>
        </RegistrationForm>
      </form>
    </NavigationLayout>
  );
};

export default LoginPage;
