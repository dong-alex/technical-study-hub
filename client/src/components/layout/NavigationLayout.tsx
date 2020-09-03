import React, { FunctionComponent } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuthProvider } from "../auth/AuthenticationProvider";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuList,
  Container,
} from "@material-ui/core";

type NavigationLayoutProps = {
  children: any;
};

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  h1 {
    text-align: center;
  }

  h2 {
    text-align: center;
  }
`;

const NavContainer = styled(MenuList)`
  padding: 0px;
  margin: 0 0 0 auto;
  display: flex;

  a {
    user-select: none;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
    padding: 1.5rem;
    transition: $transition-speed;
    border: 0;
    &:hover {
      background: #1e88e5;
      color: white;
    }
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`;

const NavItem = styled(NavLink)`
  color: white;
`;

const LeftContainer = styled.div`
  flex: 1;
`;

const StyledToolbar = styled(Toolbar)`
  padding-right: 0;
`;

const NavigationLayout: FunctionComponent<NavigationLayoutProps> = ({
  children,
}) => {
  const { authenticated, loaded, onLogout } = useAuthProvider();
  return (
    loaded && (
      <div className="navigation-root">
        <AppBar position="static">
          <StyledToolbar>
            <LeftContainer>
              <Typography variant="h5" noWrap>
                Technical Study Hub
              </Typography>
            </LeftContainer>
            <NavContainer>
              <NavItem to="/tags">Tags</NavItem>
              <NavItem to="/questions">Questions</NavItem>
              {authenticated ? (
                <NavItem to="/login" onClick={onLogout}>
                  Logout
                </NavItem>
              ) : (
                <>
                  <NavItem to="/login">Login</NavItem>
                  <NavItem to="/register">Register</NavItem>
                </>
              )}
            </NavContainer>
          </StyledToolbar>
        </AppBar>
        <MainContainer className="center-align">{children}</MainContainer>
      </div>
    )
  );
};

export default NavigationLayout;
