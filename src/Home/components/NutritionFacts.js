import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  marginBottom: 24,
  background: "#000",
  boxShadow:
    "0 0 5px 2px rgb(255 255 255 / 56%), 0 0 3px 6px rgb(255 255 255 / 14%), inset 0 -1px 0px 2px rgb(0 0 0), inset 0 -2px 3px 4px rgb(141 141 141)",
  borderRadius: "10px"
});

export default function NutritionFacts() {
  return (
    <Box component="div" sx={{ px: 2 }}>
      <Grid container spacing={4} mb={2}>
        <Grid item xs={12} md={6}>
          <CardWrapper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%"
            }}
          >
            <CardContent
              sx={{
                paddingY: "8px !important",
                paddingX: "16px",
                width: "100%"
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: { sm: "row", xs: "column" },
                  width: "100%"
                }}
              >
                <Typography variant="h5" sx={{ fontSize: "18px" }}>
                  Rehearsal Exhaustion Meter:
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "18px" }}>
                  12:00
                </Typography>
              </Box>
            </CardContent>
          </CardWrapper>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardWrapper
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%"
            }}
          >
            <CardContent
              sx={{
                paddingY: "8px !important",
                paddingX: "16px",
                width: "100%"
              }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: { sm: "row", xs: "column" }
                }}
              >
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: { sm: "row", xs: "column" }
                  }}
                >
                  <Typography sx={{ fontSize: "18px" }} variant="h5">
                    Daily Rewards:
                  </Typography>
                  <Typography
                    sx={{ fontSize: "18px" }}
                    variant="h6"
                    component="span"
                    ml={1}
                  >
                    8%
                  </Typography>
                </Box>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: { sm: "row", xs: "column" }
                  }}
                >
                  <Typography sx={{ fontSize: "18px" }} variant="h5">
                    Dev Fees:
                  </Typography>
                  <Typography
                    sx={{ fontSize: "18px" }}
                    variant="h6"
                    component="span"
                    ml={1}
                  >
                    3%
                  </Typography>
                </Box>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: { sm: "row", xs: "column" }
                  }}
                >
                  <Typography sx={{ fontSize: "14px" }} variant="h5">
                    Promotion Fees:
                  </Typography>
                  <Typography
                    sx={{ fontSize: "14px" }}
                    variant="h6"
                    component="span"
                    ml={1}
                  >
                    3%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </CardWrapper>
        </Grid>
      </Grid>
    </Box>
  );
}
