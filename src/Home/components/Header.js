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
        <Wrapper>
          <MenuButton onClick={() => { setToggle(!toggle) }}>
            <MenuRoundedIcon />
            <div >
              Menu
            </div>
          </MenuButton>

          <div className="header_logo">
            <img src={logo} alt="" width={"600px"} />
          </div>
          <Connect />
        </Wrapper>
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
            <div className="menu-bar">
              <div style={{ alignSelf: "center", marginTop: "10px" }}>
                <img src="./favicon.png" alt="" width={"30px"} />
              </div>
              <div className="menu-list">
                <div className="menu-item">
                  <GiMiner className="a-icon" />
                  <a href="https://bnbkingdom.xyz/?ref=0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6" className={!isBUSDLink ? "w-disable" : ''} target="_blank" style={{ flex: 1 }}>
                    BNB Kingdom
                  </a>
                  <div className={!isBUSDLink ? "menu-line" : ''} />
                </div>
                <div className="menu-item">
                  <GiMiner className="a-icon" />
                  <a href="https://busdkingdom.xyz/" className={isBUSDLink ? "w-disable" : ''} target="_blank" style={{ flex: 1 }}>
                    BUSD Kingdom
                  </a>
                  <div className={isBUSDLink ? "menu-line" : ''} />
                </div>
                <div className="menu-item">
                  <FaCoins className="a-icon" />
                  <a href="https://twitter.com/BNBKingdom" target="_blank" className="a-disable">
                    Token
                  </a>
                </div>
                <div className="menu-item">
                  <FaEthereum className="a-icon" />
                  <a href="https://twitter.com/BNBKingdom" target="_blank" className="a-disable">
                    NFT
                  </a>
                </div>
                <div className="menu-item">
                  <BiJoystick className="a-icon" />
                  <a href="/" target="_blank" className="a-disable">
                    P2E
                  </a>
                </div>
                <div className="menu-item" style={{ marginLeft: "5px", zIndex: "999" }}>
                  <LanguageSelect responsive={true} />
                </div>
              </div>

              <div style={{ flex: 1 }}></div>
              <div >
                <Footer />
              </div>
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
