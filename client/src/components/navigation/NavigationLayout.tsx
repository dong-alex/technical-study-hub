import React, { FunctionComponent } from "react";
import "../../sass/navigationLayout.scss";
import Sidebar from "./Sidebar";

type NavigationLayoutProps = {
  children: any;
};

const NavigationLayout: FunctionComponent<NavigationLayoutProps> = ({
  children,
}) => {
  return (
    <div className="app-shell">
      <section className="sticky-navigation">Main Navigation Bar</section>
      <ul className="left-side">
        <li>Create label</li>
        <li>Add question</li>
        <li>Questions</li>
        <li>Help</li>
      </ul>
      <section className="main-content">{children}</section>
      {/* <aside className="right-side">Right sidebar</aside> */}
      <footer className="sticky-footer">Main Footer Bar</footer>
    </div>
  );
};

export default NavigationLayout;
