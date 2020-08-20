import React, { FunctionComponent } from "react";
import "materialize-css";
import { Navbar, NavItem, Icon, Row, Col } from "react-materialize";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../../sass/navigationLayout.scss";
import { useAuthProvider } from "../auth/AuthenticationProvider";
import { DataProvider } from "../../hooks/DataProvider";

type NavigationLayoutProps = {
  children: any;
};

const MainContainer = styled.div`
  margin: 1rem;
  height: 100%;
  width: 100%;
`;

const Sidebar = styled.ul`
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
`;

const NavigationLayout: FunctionComponent<NavigationLayoutProps> = ({
  children,
}) => {
  const { authenticated, loaded, onLogout } = useAuthProvider();
  return (
    loaded && (
      <DataProvider>
        <div className="navigation-root">
          <Navbar
            alignLinks="right"
            className="main-navbar light-blue darken-2"
            brand={<span>Technical Study Hub</span>}
            menuIcon={<Icon>menu</Icon>}
            options={{
              draggable: true,
              edge: "left",
              inDuration: 250,
              outDuration: 200,
              preventScrolling: true,
            }}
          >
            <NavLink to="/tags">Tags</NavLink>
            <NavLink to="/questions">Questions</NavLink>
            {authenticated ? (
              <NavLink to="/login" onClick={onLogout}>
                Logout
              </NavLink>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </Navbar>
          <MainContainer className="center-align">{children}</MainContainer>
        </div>
      </DataProvider>
    )
  );
};

export default NavigationLayout;
