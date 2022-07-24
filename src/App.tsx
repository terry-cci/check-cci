import "./App.css";

import { useState } from "react";

import GameBoard from "@/components/GameBoard";
import LeftSideBar from "./components/LeftSideBar";

function App() {
  return (
    <div className="app">
      <LeftSideBar />
      <GameBoard />
    </div>
  );
}

export default App;
