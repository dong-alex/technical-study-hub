import React, { FunctionComponent } from "react";
import "materialize-css";
import { Navbar, NavItem, Icon, Row, Col } from "react-materialize";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import "../../sass/navigationLayout.scss";
import { useAuthProvider } from "../auth/AuthenticationProvider";

type NavigationLayoutProps = {
  children: any;
};

const MainContainer = styled.div`
  margin: 1rem;
  height: 100%;
  width: 100%;
`;

const NavigationLayout: FunctionComponent<NavigationLayoutProps> = ({
  children,
}) => {
  const { authenticated, loaded, onLogout } = useAuthProvider();
  return (
    loaded && (
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
          <NavLink to="/">Home</NavLink>
          <NavLink to="/questions">Questions</NavLink>
          <NavLink to="/settings">Settings</NavLink>
          {authenticated ? (
            <NavLink to="/login" onClick={onLogout}>
              Logout
            </NavLink>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </Navbar>
        <Row>
          <Col s={2} m={3} l={1} className="left-side light-blue lighten-2">
            <NavLink to="/questions" className="sidebar-nav">
              Questions
            </NavLink>
            <NavLink to="/tags" className="sidebar-nav">
              Tags
            </NavLink>
          </Col>
          <Col s={10} m={9} l={11} className="main-content">
            <MainContainer>{children}</MainContainer>
          </Col>
        </Row>
      </div>
    )
  );
};

export default NavigationLayout;
