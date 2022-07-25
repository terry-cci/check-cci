import React from "react";
import "@/styles/LeftSideBar.css";

import PlayerCounter from "./LeftSideBar/PlayerCounter";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { confirmMove, startGame } from "@/store/main";

import CheckIcon from "@mui/icons-material/Check";

export default function LeftSideBar() {
  const dispatch = useAppDispatch();

  const validMove = useAppSelector(
    (state) => state.main.selectedDestination && state.main.selectedMarbleId
  );

  return (
    <div className="left-sidebar">
      <PlayerCounter />
      <Button variant="contained" onClick={() => dispatch(startGame())}>
        開始遊戲
      </Button>

      <Button
        variant="contained"
        endIcon={<CheckIcon />}
        color="success"
        onClick={() => dispatch(confirmMove())}
        disabled={!validMove}
      >
        移動波子
      </Button>
    </div>
  );
}
