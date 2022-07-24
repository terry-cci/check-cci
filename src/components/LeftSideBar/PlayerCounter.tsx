import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPlayerCount } from "@/store/main";
import { TextField } from "@mui/material";
import { clamp } from "@/utils/math";

export default function PlayerCounter() {
  const [value, setValue] = useState<number | string>(2);

  const playerCount = useAppSelector((state) => state.main.playerCount);
  useEffect(() => {
    setValue(playerCount);
  }, [playerCount]);

  const dispatch = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    let newValue = parseInt(e.target.value);

    if (isNaN(newValue)) {
      setValue(e.target.value);
      return;
    }
    newValue = clamp(newValue, 6);

    setValue(newValue);
    dispatch(setPlayerCount(newValue));
  }

  return (
    <TextField
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      value={value}
      onChange={handleChange}
      label="玩家人數"
    />
  );
}
