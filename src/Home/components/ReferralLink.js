import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

// 0x9dda759C79d073509D020d74F084C5D2bd080000
const CardWrapper = styled(Card)({
  background: "#000",
  boxShadow:
    "0 0 5px 2px rgb(255 255 255 / 56%), 0 0 3px 6px rgb(255 255 255 / 14%), inset 0 -1px 0px 2px rgb(0 0 0), inset 0 -2px 3px 4px rgb(141 141 141)",
  borderRadius: "50px",
  width: "100%",
  height: "100%"
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 14,
  fontFamily: "'Titan One', cursive",
  padding: "4px 10px",
  textAlign: "center",
  borderRadius: 5,
  border: "1px solid #555",
  backgroundImage:
    "linear-gradient(180deg ,#545454 9%,#262626 23%, #292929 39%, #262626 67%, #545454 90%,#545454 69%)",
  width: "100%",
  outline: "none",
  color: theme.palette.text.primary,
  height: "40px"
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  backgroundImage:
    "linear-gradient(180deg ,#545454 9%,#262626 23%, #292929 39%, #262626 67%, #545454 90%,#545454 69%)",
  color: "#fff",
  padding: "0 8px",
  borderRadius: "5px",
  [theme.breakpoints.down("sm")]: {
    height: "40px"
  }
}));
export default function ReferralLink({ address }) {
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100%"
        }}
      >
        <CardWrapper sx={{ p: { md: 4, xs: 2 } }}>
          <CardContent>
            <Typography
              variant="h5"
              textAlign="center"
              sx={{ fontSize: "22px", mb: 4 }}
            >
              Congratulations on your ticket sales
            </Typography>
            <BoxWrapper
              component="div"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2
              }}
            >
              <Typography variant="h6" sx={{ fontSize: { sm: 24, xs: 16 } }}>Tickets Sold:</Typography>
              <Typography variant="h5" sx={{ fontSize: { sm: 24, xs: 16 } }}>1,000</Typography>
            </BoxWrapper>
            <Typography
              textAlign="center"
              variant="h6"
              marginY={2}
              sx={{ fontSize: "24px" }}
            >
              Now it is time to promote the tour!
            </Typography>
            <Typography
              textAlign="center"
              variant="h5"
              sx={{ fontSize: "16px" }}
              mb={3}
            >
              Rockstar Accelerator Link:
            </Typography>
            <Input value="http://www.rockstar.com" readOnly />
            <Box component="div" sx={{ width: "100%", textAlign: "center" }}>
              <IconButton size="large" color="primary">
                <ContentPasteIcon />
              </IconButton>
              <Typography
                variant="h6"
                sx={{ fontSize: "12px" }}
                component="span"
                color="primary"
              >
                Copy
              </Typography>
            </Box>
          </CardContent>
        </CardWrapper>

        <CardWrapper sx={{ borderRadius: 5, mt: 4 }}>
          <CardContent>
            <Typography variant="h5" textAlign="center">
              Mandatory Rehearsal Timer
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ fontSize: "18px" }}
            >
              24:00
            </Typography>
          </CardContent>
        </CardWrapper>
      </Box>
    </>
  );
}
