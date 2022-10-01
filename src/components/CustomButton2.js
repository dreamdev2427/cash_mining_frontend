import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const MainButton = styled(Button)(({ theme }) => ({
  marginTop: 18,
  textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
  borderRadius: "5px",
  border: "1px solid #FCCE1E",
  fontWeight: "400",
  fontSize: "14px",
  padding: "13px 28px",
  lineHeight: 1,
  // background: "linear-gradient(90deg, rgba(255,50,20,0.75), rgba(253, 136, 53, 0.75))",
  backgroundImage:
    "linear-gradient(90deg, hsla(37, 100%, 50%, 0.75) 0%, hsla(48, 97%, 55%, 0.75) 100%)",
  color: theme.palette.text.primary,
  maxHeight: "52px",
  disabled: {
    backgroundColor: 'red'
  }
}));

export default function CustomButton2({label, countdown, onClick, ...rest}) {

  return (
    <MainButton
      color={countdown.alive ? "primary" : "secondary"}
      variant="contained"
      fullWidth {...rest}
      onClick = {onClick}
      disabled = {countdown.alive}
    >
      { countdown.alive ? countdown.hours + "H " + countdown.minutes + "M " + countdown.seconds + "S" : label }
    </MainButton>
  );
}
