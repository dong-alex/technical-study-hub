import React, { FunctionComponent } from "react";

type SidebarProps = {};

const Sidebar: FunctionComponent<SidebarProps> = () => {
  return (
    <ul>
      <li>Create label</li>
      <li>Add question</li>
      <li>Questions</li>
      <li>Help</li>
    </ul>
  );
};

export default Sidebar;
