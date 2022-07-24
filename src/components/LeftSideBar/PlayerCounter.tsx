import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

export default function PlayerCounter() {
  const playerCount = useAppSelector((state) => state.main.playerCount);
  const dispatch = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    return;
  }

  return (
    <TextField
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      value={playerCount}
      onChange={handleChange}
    />
  );
}
