import { InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { ChangeEvent, ReactNode } from "react";

interface Props {
  icon: ReactNode;
  placeholder: string;
  value: string;
  name: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: string;
}

const CustomInput = ({
  icon,
  placeholder,
  value,
  name,
  handleChange,
  type,
}: Props) => {
  return (
    <>
      <TextField
        sx={{
          "& label.Mui-focused": {
            color: "#dedbed",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#dedbed",
            },
            "&:hover fieldset": {
              borderColor: "#8146ff",
            },
          },
          input: { color: "#dedbed" },
          marginBottom: "1rem",
          width: "400px",
        }}
        inputProps={{ style: { padding: 10 } }}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position={"start"}>{icon}</InputAdornment>
          ),
        }}
        name={name}
        value={value}
        type={type}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default CustomInput;
