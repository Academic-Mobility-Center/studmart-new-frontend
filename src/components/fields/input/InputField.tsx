import React, { useRef, useEffect } from "react";
import { TextField, Typography, Box } from "@mui/material";

interface InputFieldProps {
  label: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  autoComplete?: string;
  width?: number;
  labelFontSize?: number;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  minRows?: number;
  maxRows?: number;
}

export default function InputField({
  label,
  placeholder,
  name,
  value,
  onChange,
  autoComplete,
  width = 350,
  labelFontSize = 14,
  onBlur,
  minRows = 1,
  maxRows,
}: InputFieldProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return (
    <Box display="flex" flexDirection="column" gap={1} width={width}>
      <Typography sx={{ fontSize: labelFontSize, color: "#032c28" }}>
        {label}
      </Typography>
      <TextField
        multiline
        inputRef={inputRef}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        onBlur={onBlur}
        minRows={minRows}
        maxRows={maxRows}
        InputProps={{
          sx: {
            borderRadius: "16px",
            backgroundColor: "#fff",
            color: "#032c28",
            "&::placeholder": {
              color: "#888888",
            },
            font: "Milish"
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            padding: "13px 12px 12px 20px",
            "& fieldset": {
              borderColor: "#ccc",
            },
            "&:hover fieldset": {
              borderColor: "#888",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#032c28",
            },
          },
        }}
      />
    </Box>
  );
}
