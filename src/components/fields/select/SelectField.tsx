
import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Typography,
  Box,
  AutocompleteRenderInputParams,
} from "@mui/material";

type Option = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  label: string;
  options: Option[];
  value?: Option | undefined;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  width: number;
  labelFontSize: number;
  placeholder: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export function SelectField({
  label,
  options,
  value,
  name,
  onChange,
  width,
  labelFontSize,
  placeholder,
  onBlur,
  disabled,
}: SelectFieldProps) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(
    value || null
  );

  useEffect(() => {
    setSelectedOption(value || null);
  }, [value]);

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: Option | null
  ) => {
    setSelectedOption(newValue);
    if (onChange) {
      const event = {
        target: {
          name,
          value: newValue?.value || "",
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      onChange(event);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={1} width={width}>
      <Typography sx={{ fontSize: labelFontSize, color: "#032c28" }}>
        {label}
      </Typography>
      <Autocomplete
        options={options}
        value={selectedOption}
        onChange={handleChange}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        disabled={disabled}
        noOptionsText="Ничего не найдено"
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            placeholder={placeholder}
            name={name}
            onBlur={onBlur}
            InputProps={{
              ...params.InputProps,
              sx: {
                paddingRight: "10px",
                borderRadius: "16px",
                backgroundColor: "#fff",
                color: "#032c28",
                "& input::placeholder": {
                  color: "#888888",
                  opacity: 1,
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                paddingLeft: "20px",
                height: "48px",
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
        )}
        renderOption={(props, option) => {
          const { key, ...rest } = props
          return(
            <Box
            component="li"
            key={key} {...rest}
            sx={{
              px: 2,
              py: 1,
              cursor: "pointer",
              color: "#032c28",
              "&:hover": {
                backgroundColor: "#032c28",
                color: "#8FE248",
              },
              "&.Mui-focused": {
                backgroundColor: "#032c28",
                color: "#8FE248",
              },
            }}
          >
            {option.label}
          </Box>
          )

        }}
      />
    </Box>
  );
}

