import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import logo from "../../assets/bnbking-logo.png";
import Connect from "./Connect";
import LanguageSelect from "./LanguageSelect";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { GiMiner } from 'react-icons/gi';
import { FaCoins, FaEthereum } from 'react-icons/fa';
import { BiJoystick } from 'react-icons/bi'

import Footer from "./Footer";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingTop: "50px",
  paddingBottom: 24,
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

const SmallScreenWrapper = styled("div")(({ theme }) => ({
  display: "none",
  textAlign: "center",
  paddingTop: "50px",
  paddingBottom: 24,
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
    display: "block",
  },
}));

const MenuButton = styled(Button)(({ theme }) => ({
  display: "flex",
  width: "190px",
  height: "55px",
  marginTop: "52px",
  justifyContent: "space-around !important",
  textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
  borderRadius: "5px",
  // border: "1px solid #ff5141",
  fontWeight: "400",
  fontSize: "15px",
  padding: "15px 24px",
  lineHeight: 1,
  backgroundImage:
    "linear-gradient(90deg, #f5a002, #f3c518)",
  color: theme.palette.text.primary,
  [theme.breakpoints.down("md")]: {
    // display: "none",
    width: "45%",
    height: "40px",
    marginTop: "20px",
    fontSize: "14px",
  },
}));

export default function Header() {
  const [toggle, setToggle] = useState(false);
  let isMobile = window.matchMedia("only screen and (max-width: 900px)").matches;
  console.log("isMobile: ", isMobile);
  const link = window.location.href;
  const isBUSDLink = link.includes("busd");

  return (
    <Box
      component="div"
      sx={{ px: { lg: 0, xs: 2 }, width: "100%", maxWidth: "calc(100% - 11%)", mx: "auto", zIndex: "1" }}
    >
      {!isMobile ?
        <>
          <Wrapper>
            <Connect />
          </Wrapper>
          <Wrapper sx={{ display: "flex", justifyContent: "center" }}>
            <div className="header_logo">
              <img src={logo} alt="" width={"600px"} />
            </div>
          </Wrapper>
        </>
        :
        <SmallScreenWrapper>
          <div className="header_logo">
            <img src={logo} alt="" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <MenuButton onClick={() => { setToggle(!toggle) }}>
              <MenuRoundedIcon />
              <div>
                Menu
              </div>
            </MenuButton>
            <Connect responsive={false} />
          </div>
        </SmallScreenWrapper>
      }
      {
        toggle ?
          <div style={{ height: "100%", width: "100%", display: "flex", position: "fixed", top: "0px", left: "0px", background: "rgba(0,0,0,0.3)", zIndex: "3" }} >
            <div className="menu-bar" style={{ paddingTop: "100px" }}>
              <Footer />
            </div>
            <div style={{ height: "100%", width: "3px", backgroundColor: "#FCCE1E" }}></div>
            <div style={{ flex: 1, zIndex: "9999" }} onClick={() => { setToggle(!toggle) }}>
            </div>
          </div>
          :
          <></>
      }
    </Box>
  );
}
