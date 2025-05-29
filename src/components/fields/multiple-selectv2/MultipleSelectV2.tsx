import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  Chip,
  Box,
  Typography,
  Checkbox,
  ListItemText,
  SelectChangeEvent,
} from "@mui/material";

type Option = {
  label: string;
  value: string;
};

interface SelectFieldProps {
  label: string;
  options: Option[];
  value?: Option[];
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  width: number;
  labelFontSize: number;
  placeholder: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: "auto",
    },
  },
};

export function MultipleSelectV2({
    label,
    options,
    value = [],
    name,
    onChange,
    width,
    labelFontSize,
    placeholder,
    onBlur,
    disabled,
  }: SelectFieldProps) {
    const selectedValues = value.map((opt) => opt.value);
  
    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const {
          target: { value: selectedValues },
        } = event;
        
        const selected = typeof selectedValues === 'string'
          ? selectedValues.split(',')
          : selectedValues;
      
        if (onChange) {
          const fakeEvent = {
            target: {
              name,
              value: selected, // <<< здесь теперь именно массив
            },
          } as unknown as React.ChangeEvent<HTMLSelectElement>;
          onChange(fakeEvent);
        }
      };
  
    return (
      <Box display="flex" flexDirection="column" gap={1} width={width}>
        <Typography sx={{ fontSize: labelFontSize, color: "#032c28" }}>
          {label}
        </Typography>
        <FormControl fullWidth sx={{m: 0}}>
            
          <Select
            id={name}
            multiple
            value={selectedValues}
            onChange={handleChange}
            
            input={
              <OutlinedInput
                name={name}
                onBlur={onBlur}
                placeholder={placeholder}
                sx={{
                  paddingRight: "10px",
                  borderRadius: "16px",
                  backgroundColor: "#fff",
                  color: "#032c28",
                  "& input::placeholder": {
                    height: "48px",
                    color: "#888888",
                    opacity: 1,
                  },
                  height: "48px",
                }}
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((selectedValue) => {
                  const selectedOption = options.find(
                    (opt) => opt.value === selectedValue
                  );
                  return selectedOption ? (
                    <Chip
                      key={selectedOption.value}
                      label={selectedOption.label}
                      sx={{
                        backgroundColor: "#032c28",
                        // backgroundColor: "#fff",
                        color: "#8FE248",
                        height: "24px",
                      }}
                    />
                  ) : null;
                })}
              </Box>
            )}
            MenuProps={MenuProps}
            disabled={disabled}
            sx={{
              "& .MuiOutlinedInput-root": {
                paddingLeft: "20px",
                "& fieldset": {
                  borderColor: "#ccc",
                },
                "&:hover fieldset": {
                  borderColor: "#888",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#032c28",
                },
                "& input": {
                    paddingLeft: "20px", // вот здесь нужный отступ для текста внутри
                },
                "& .MuiSelect-select": {
                    paddingTop: "10px",   // вертикальный паддинг сверху
                    paddingBottom: "10px", // вертикальный паддинг снизу
                    paddingLeft: "20px",   // отступ слева для текста
                    display: "flex",
                    alignItems: "center", // чтобы текст был по центру
                  },
              },
               minHeight: "48px",
              borderRadius: "16px"
            }}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  px: 2,
                  py: 1,
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
                <Checkbox
                  checked={selectedValues.indexOf(option.value) > -1}
                  sx={{
                    color: "#032c28",
                    "&.Mui-checked": {
                      color: "#8FE248",
                    },
                  }}
                />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
