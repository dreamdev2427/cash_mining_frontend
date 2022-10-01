import { ImportantDevices } from "@material-ui/icons";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5141",
    },
    secondary: {
      main: "#d8a909",
    },
    counter: {
      main: "linear-gradient(90deg, #3fec7a 0%, #37ba64 100%)",
    },
    text: {
      primary: "#fff",
    },
    accent: {
      main: "#FCCE1E",
      primaryGradient: `linear-gradient(90deg, hsla(37, 100%, 50%, 0.75) 0%, hsla(48, 97%, 55%, 0.75) 100%)`,
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",

    body1: {
      fontSize: 14,
      color: "#FCCE1E",
      fontWeight: "normal",
    },
    body2: {
      fontSize: 14,
      color: "#fff",
      fontWeight: "normal",
    },
    allVariants: {
      color: "#d8a909",
    },
    h3: {
      fontFamily: "'Titan One', cursive",
      fontSize: 36,
    },
    h4: {
      fontSize: 32,
    },
    h5: {
      fontSize: 24,
      color: "#fff",
    },
    h6: {
      fontSize: 20,
      color: "#ffffff",
    },
  },
  button:{
    diseabled: {
      background: "white",
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    
  },
});

export default function Theme({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
