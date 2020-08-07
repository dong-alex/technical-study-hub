import React, { FunctionComponent } from "react";
import "../../sass/navigationLayout.scss";
import "materialize-css";
import { Navbar, NavItem, Icon } from "react-materialize";
// import MenuLogo from "../../assets/sidebar-menu.svg";
import Sidebar from "./Sidebar";

type NavigationLayoutProps = {
  children: any;
};

const NavigationLayout: FunctionComponent<NavigationLayoutProps> = ({
  children,
}) => {
  return (
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
        <NavItem>Home</NavItem>
        <NavItem>Questions</NavItem>
        <NavItem>Settings</NavItem>
        <NavItem href="/login">Login</NavItem>
      </Navbar>
      <div className="row">
        <div className="col s3 m4 l2 left-side light-blue lighten-2">
          <ul>
            <li>Add question</li>
            <li>Questions</li>
            <li>Tags</li>
            <li>Help</li>
          </ul>
        </div>
        <div className="col s9 m8 l10 container main-content">{children}</div>
      </div>
    </div>
  );
};

export default NavigationLayout;
