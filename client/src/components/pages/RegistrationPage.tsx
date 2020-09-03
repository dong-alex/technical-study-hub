import React, { FunctionComponent, useState, ChangeEvent } from "react";
import NavigationLayout from "../layout/NavigationLayout";
import styled from "styled-components";
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import { useAuthProvider } from "../auth/AuthenticationProvider";
import SendIcon from "@material-ui/icons/Send";
import LockIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import { RegistrationPageProps } from "../../types";

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

const RegistrationPage: FunctionComponent<RegistrationPageProps> = () => {
  const { onRegister } = useAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

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

  return (
    <NavigationLayout>
      <form className="form" noValidate>
        <Headline variant="h4">Registration</Headline>
        <RegistrationForm>
          <TextField
            name="username"
            label="Username"
            onChange={handleNameChange}
            value={name}
            inputProps={{
              autoComplete: "off",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            onChange={handleEmailChange}
            value={email}
            autoComplete="email"
            inputProps={{
              autoComplete: "off",
            }}
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
            autoComplete="new-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
            inputProps={{
              autoComplete: "off",
            }}
          />

          <StyledButton
            color="primary"
            variant="contained"
            startIcon={<SendIcon />}
            onClick={handleRegistration}
          >
            Sign-up
          </StyledButton>
        </RegistrationForm>
      </form>
    </NavigationLayout>
  );
};

export default RegistrationPage;
