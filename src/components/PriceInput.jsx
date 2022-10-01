import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const BnbInput = styled("input")(({ theme }) => ({
  fontFamily: "'Titan One', cursive",
  fontSize: 26,
  fontWeight: 500,
  padding: "0px 65px 0px 0px",
  textAlign: "right",
  backgroundImage:
    "linear-gradient(180deg ,#545454 9%,#262626 23%, #292929 39%, #262626 67%, #545454 90%,#545454 69%)",
  color: theme.palette.primary.main,
  borderRadius: "5px",
  width: "100%",
  outline: "none",
  [theme.breakpoints.down("sm")]: {
    fontSize: 16,
    height: "40px",
    padding: "0px 40px 0px 0px"
  },
  "& label.Mui-focused": {
    color: "#ffffff00"
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#ffffff00"
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff00"
    },
    "&:hover fieldset": {
      borderColor: "#ffffff00"
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff00"
    }
  }
}));

export default function PriceInput({ value, max, onChange = () => {} }) {
  return (
    <Box position="relative">
      <Typography
        variant="h6"
        position="absolute"
        left={10}
        sx={{
          fontFamily: "'Titan One', cursive",
          fontSize: { sm: 24, xs: 16 },
          top: { sm: 3, xs: 8 }
        }}
      >
        Budget For Venue
      </Typography>
      <BnbInput
        type="number"
        className="priceinput"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span></span>
      <Typography
        variant="h6"
        position="absolute"
        top={3}
        right={10}
        sx={{
          fontFamily: "'Titan One', cursive",
          fontSize: { sm: 24, xs: 16 },
          top: { sm: 3, xs: 8 }
        }}
      >
        SOL
      </Typography>
    </Box>
  );
}
