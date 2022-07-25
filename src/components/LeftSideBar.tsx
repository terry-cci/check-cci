import React from "react";
import "@/styles/LeftSideBar.css";

import PlayerCounter from "./LeftSideBar/PlayerCounter";
import { Button } from "@mui/material";
import { useAppDispatch } from "@/store/hooks";
import { startGame } from "@/store/main";

export default function LeftSideBar() {
  const dispatch = useAppDispatch();

  return (
    <div className="left-sidebar">
      <PlayerCounter />
      <Button variant="contained" onClick={() => dispatch(startGame())}>
        開始遊戲
      </Button>
    </div>
  );
}
