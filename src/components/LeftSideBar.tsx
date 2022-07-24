import React from "react";
import "@/styles/LeftSideBar.css";

import PlayerCounter from "./LeftSideBar/PlayerCounter";

export default function LeftSideBar() {
  return (
    <div className="left-sidebar">
      <PlayerCounter />
    </div>
  );
}
