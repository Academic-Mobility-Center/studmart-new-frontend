import { Switch } from "@mui/material";
import { styled } from "@mui/material/styles";
export const StyledSwitch = styled(Switch)(({ }) => ({
    width: 39,
    height: 26,
    padding: 3,
    display: "flex",
    alignItems: "center",
  
    "& .MuiSwitch-switchBase": {
      padding: 2,
      transitionDuration: "250ms",
      marginLeft: 2,
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#032C28",
        marginRight: 3,
        "& + .MuiSwitch-track": {
          backgroundColor: "#8FE248",
          borderColor: "#8FE248",
          opacity: 1,
          border: "1.25px solid #032C28",
        },
      },
    },
    "& .MuiSwitch-thumb": {
        boxSizing: "border-box",
        width: 9.75,
        height: 9.75,
        backgroundColor: "#032C28",
        marginTop: "6.5px",
        marginBottom: "2px",
        marginLeft: 3, 
      },
    "& .MuiSwitch-track": {
      borderRadius: 15,
      border: "1.25px solid #032C28",
      opacity: 1,
      boxSizing: "border-box",
      backgroundColor: 'white'
    },
}));