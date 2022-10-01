/* eslint-disable react-hooks/exhaustive-deps */
import InfoIcon from "@mui/icons-material/Info";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { alpha, styled } from "@mui/material/styles";
import CustomButton from "../../components/CustomButton";
import CustomButton2 from "../../components/CustomButton2";
import CustomButton3 from "../../components/CustomButton3";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import { useLocation, useResolvedPath } from "react-router-dom";
import Web3 from "web3";

import { useContractContext } from "../../providers/ContractProvider";
import { useAuthContext } from "../../providers/AuthProvider";
import { useEffect, useState } from "react";
import { config } from "../../config";
import "../../index.css"
import { Toast } from "../../util"

import { useTranslation, Trans } from "react-i18next";

import { useSelector } from "react-redux";
import Axios from "axios";
import { shorten } from "./Connect";

const CardWrapper = styled(Card)({
  background: "#0000002e",
  borderRadius: "5px",
  width: "100%",
  border: "1px solid #21DF2F",
  backdropFilter: "blur(3px)",
  padding: "16px",
  height: "100%",
});

const SubTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: "60px",
    marginLeft: "5px"
  },
}));

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "transparent",
    fontSize: 16,
    width: "100%",
    height: "100%",
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    border: "1px solid #21DF2F",
    "&:focus": {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const PrimaryTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  fontSize: "5px",
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.main,
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
}));

const CardDivider = {
  borderRight: "3px solid #21DF2F",
  height: "75%",
  margin: "auto",
  width: "12px",
  textAlign: "center",
  position: "absolute",
  top: "75%",
  // left: "50%",
  transform: "translate(-50%,-75%)",
};

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function _wait(ms = 5000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const copyfunc = async (text) => {
  try {
    const toCopy = text;
    await navigator.clipboard.writeText(toCopy);
    Toast.fire({
      icon: 'success',
      title: "Copied to clipboard!"
    });
  }
  catch (err) {
    console.error('Failed to copy: ', err);
  }
}

export const numberWithCommas = (x, digits = 3) => {
  return Number(x).toLocaleString(undefined, { maximumFractionDigits: digits });
}

export default function BakeCard() {
  const { t, i18n } = useTranslation();
  const languageType = useSelector(state => state.data.lang);

  const { contract, contractUSDT, contractLottory, wrongNetwork, getBnbBalance, fromWei, toWei, web3 } =
    useContractContext();
  const { address, chainId } = useAuthContext();
  const [contractBNB, setContractBNB] = useState(0);
  const [walletBalance, setWalletBalance] = useState({
    bnb: 0,
    beans: 0,
    rewards: 0,
    value: 0,
  });

  // Lottory
  const [roundStarted, setRoundStarted] = useState(false);
  const [jackpotSize, setJackpotSize] = useState(0);
  const [refMode, setRefMode] = useState(0);
  const [countDownLotto, setCountDownLotto] = useState(0);
  const [winner, setWinner] = useState('');
  const [yourTickets, setYourTickets] = useState(0);


  useEffect(() => {
    onChangeLangType(languageType);
  }, [languageType]);

  const [initialBNB, setInitialBNB] = useState(0);
  const [compoundDay, setCompoundDay] = useState(0);
  const [referralWallet, setReferralWallet] = useState('')
  // const [referralLink, setReferralLink] = useState('')
  const [estimatedRate, setEstimatedRate] = useState('')
  const [bakeBNB, setBakeBNB] = useState(0);
  const [estimatedLands, setEstimatedLands] = useState(0);
  const [calculatedBeans, setCalculatedBeans] = useState(0);
  const [loading, setLoading] = useState(false);

  const [newTotal, setNewTotal] = useState(0);
  const [profitAmount, setProfitAmount] = useState(0);
  const [profitValue, setProfitValue] = useState(0);
  const [dailyESRewards, setDeailyESRewards] = useState(0);

  const [lasthatch, setLasthatch] = useState(0);
  const [compoundTimes, setCompoundTimes] = useState(0);
  const [refBonus, setRefBonus] = useState(0);
  const [refCount, setRefCount] = useState(0);

  const query = useQuery();

  const link = `${window.origin}?ref=${referralWallet}`;

  const EGGS_TO_HIRE_1MINERS = 864000;

  const fetchContractBNBBalance = async () => {
    if (!web3 || wrongNetwork) {
      setContractBNB(0);
      return;
    }
    getBnbBalance(config.contractAddress).then((amount) => {
      setContractBNB(fromWei(amount));
    });

    const es = await contract.methods
      .calculateEggBuySimple(toWei("1"))
      .call()
      .catch((err) => {
        console.error("estimateRateError:", err);
        return 0;
      })
    setEstimatedRate(parseInt(es / EGGS_TO_HIRE_1MINERS));
  };

  const fetchWalletBalance = async () => {
    if (!web3 || wrongNetwork || !address) {
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
        value: 0
      });

      setCompoundTimes(0);
      setRefBonus(0);
      setRefCount(0);

      return;
    }

    try {
      const [bnbAmount, beansAmount, rewardsAmount] = await Promise.all([
        getBnbBalance(address),
        contract.methods
          .getMyMiners()
          .call({ from: address })
          .catch((err) => {
            console.error("myminers", err);
            return 0;
          }),
        contract.methods
          .getAvailableEarnings(address)// .beanRewards(address)
          .call()
          .catch((err) => {
            console.error("available_earning", err);
            return 0;
          }),
      ]);

      const valueAmount = await contract.methods
        .calculateEggSell(beansAmount * EGGS_TO_HIRE_1MINERS)
        .call()
        .catch((err) => {
          console.error("calc_egg_sell", err);
          return 0;
        });

      setWalletBalance({
        bnb: fromWei(`${bnbAmount}`),
        beans: beansAmount,
        rewards: fromWei(`${rewardsAmount}`),
        value: fromWei(`${valueAmount}`),
      });

      const userInfo = await contract.methods
        .users(address)
        .call((err) => {
          console.error("userInfo error", err);
          return 0;
        });

      const refInfo = await contract.methods
        .users('0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6')
        .call((err) => {
          console.error("userInfo error", err);
          return 0;
        });

      setRefMode(100 * fromWei(refInfo.initialDeposit.toString()));
      console.log("mcb: userInfo=> ", refInfo);
      setLasthatch(userInfo.lastHatch);
      setCompoundTimes(userInfo.dailyCompoundBonus);
      setRefBonus(fromWei(userInfo.referralEggRewards));
      setRefCount(userInfo.referralsCount);
    } catch (err) {
      console.error(err);
      setWalletBalance({
        bnb: 0,
        beans: 0,
        rewards: 0,
        value: 0,
      });
    }
  };

  const fetchLottoryInfo = async () => {
    if (!web3 || wrongNetwork || !address) {
      setTicketCount(0);
      setLastTicketCount(0);
      setTotalTicketCount(0);
      setRoundStartLottery(0);
      setRoundIntervalLottery(0);
      setJackpotSize(0);
      // setRoundStarted(false);
      setLotteryWinner(zeroAddrss);

      return;
    }
    const [roundStarted, roundID] = await Promise.all([
      contractLottory.methods.started()
        .call()
        .catch((err) => {
          console.error("lottory error:", err);
        }),
      contractLottory.methods.roundID()
        .call()
        .catch((err) => {
          console.error("lottory error:", err);
        })
    ]);;
    console.log("round Started: ", roundStarted);
    console.log("round ID: ", roundID - 1);
    const [jPotSize, roundStart, roundInterval, lastLotteryInfo, currentLotteryInfo, ticketCnt, lastTicketCnt] = await Promise.all([
      contractLottory.methods.jackPotSize()
        .call()
        .catch((err) => {
          console.error("lottory error:", err);
        }),
      contractLottory.methods.roundStart()
        .call()
        .catch((err) => {
          console.error("lottory error: ", err);
        }),
      contractLottory.methods.roundInterval()
        .call()
        .catch((err) => {
          console.error("lottory error: ", err);
        }),
      contractLottory.methods.lotteryInfo(roundID - 1)
        .call()
        .catch((err) => {
          console.error("lottory error: ", err);
        }),
      contractLottory.methods.lotteryInfo(roundID)
        .call()
        .catch((err) => {
          console.error("lottory error: ", err);
        }),
      contractLottory.methods.getUserTicketInfo(address, roundID)
        .call()
        .catch((err) => {
          console.error("lottory error: ", err);
        }),
      contractLottory.methods.getUserTicketInfo(address, roundID - 1)
        .call()
        .catch((err) => {
          console.error("lottory error: ", err);
        }),
    ]);
    setLotteryWinner(lastLotteryInfo.winnerAccount);

    console.log("totalTicketCnt: ", currentLotteryInfo.totalTicketCnt);
    setTicketCount(ticketCnt);
    setLastTicketCount(lastTicketCnt);
    setTotalTicketCount(currentLotteryInfo.totalTicketCnt);
    setRoundStartLottery(roundStart);
    setRoundIntervalLottery(roundInterval);
    setJackpotSize(fromWei(jPotSize));
    setRoundStarted(roundStarted);
  }

  const Calculation = async () => {
    if (!web3 || wrongNetwork) {
      setNewTotal(0);
      setProfitAmount(0);
      setProfitValue(0);
      setDeailyESRewards(0);

      return;
    }

    const initMiners = estimatedRate * initialBNB;

    let miners = initMiners;

    let tBNB = initialBNB;
    for (let index = 0; index < compoundDay; index++) {
      tBNB *= 110 / 100;
      miners *= 110 / 100;
    }

    const newProfitLand = miners - initMiners;
    const newProfitBNB = tBNB - initialBNB;

    setNewTotal(parseFloat(miners).toFixed(0));
    setProfitAmount(parseFloat(newProfitLand).toFixed(0));
    setProfitValue(parseFloat(newProfitBNB).toFixed(3));
    setDeailyESRewards(parseFloat(newProfitBNB).toFixed(3) / 10);
  };

  const CalcuateEstimatedRate = async () => {
    if (!web3 || wrongNetwork) {
      setEstimatedRate(0);

      return;
    }

    const eggs = await contract.methods.calculateEggBuySimple(toWei("1"))
      .call()
      .catch((err) => {
        console.error("calculation1", err);
      });
    setEstimatedRate(parseInt(eggs / EGGS_TO_HIRE_1MINERS));
  }



  const [countdown, setCountdown] = useState({
    alive: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [countdownLottery, setCountdownLottery] = useState({
    alive: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const getCountdown = (lastCompound) => {
    const now = Date.now() / 1000;
    const total = lastCompound > 0 ? Math.max(lastCompound - now, 0) : 0;
    const seconds = Math.floor((total) % 60);
    const minutes = Math.floor((total / 60) % 60);
    const hours = Math.floor((total / (60 * 60)) % 24);
    const days = Math.floor(total / (60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    };
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      try {
        const last = Number(lasthatch);
        const data = getCountdown(last + 24 * 3600);
        setCountdown({
          alive: data.total > 0,
          days: data.days,
          hours: data.hours,
          minutes: data.minutes,
          seconds: data.seconds,
        });

      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID)
    }
  }, [lasthatch])

  const zeroAddrss = '0x0000000000000000000000000000000000000000';
  const [roundStartLottery, setRoundStartLottery] = useState(0);
  const [lotteryWinner, setLotteryWinner] = useState(zeroAddrss);
  const [roundIntervalLottery, setRoundIntervalLottery] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [lastTicketCount, setLastTicketCount] = useState(0);
  const [totalTicketCount, setTotalTicketCount] = useState(0);
  useEffect(() => {
    const intervalID = setInterval(() => {
      try {
        // console.log("LotteryRoundInfo: ", roundStartLottery, " : ", roundIntervalLottery, " : ", Number(roundStartLottery) + Number(roundIntervalLottery));
        const data = getCountdown(Number(roundStartLottery) + Number(roundIntervalLottery));
        setCountdownLottery({
          alive: data.total > 0,
          days: data.days,
          hours: data.hours,
          minutes: data.minutes,
          seconds: data.seconds,
        });
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => {
      clearInterval(intervalID)
    }
  }, [roundStartLottery, roundIntervalLottery])

  useEffect(() => {
    fetchContractBNBBalance();
  }, [web3, chainId]);

  useEffect(() => {
    fetchWalletBalance();
    if (address !== undefined)
      setReferralWallet(address);
    CalcuateEstimatedRate();
    fetchLottoryInfo();
  }, [address, web3, chainId]);

  const onUpdateBakeBNB = async (value) => {
    setBakeBNB(value);

    setEstimatedLands(parseInt(value * estimatedRate));
  };

  const onUpdateInitialBNB = (value) => {
    setInitialBNB(value);
  }

  const onUpdateCompoundDay = (value) => {
    setCompoundDay(value);
  }

  const onUpdateReferralWallet = (value) => {
    setReferralWallet(value);
  }

  // const onUpdateRefferalLink = (value) => {
  //   setReferralLink(value);
  // }

  const getRef = () => {
    const ref = Web3.utils.isAddress(query.get("ref"))
      ? query.get("ref")
      // : "0x0000000000000000000000000000000000000000";
      : "0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6";
    return ref;
  };

  const bake = async () => {
    setLoading(true);

    let ref = getRef();

    let refAddresses = [
      '0x922fc4DaB9cC8238AACf5592a35A22Fd71Dd5cFb',
      '0x67ABE77EDe7CD58E1b717a398DC82c884d79C202',
      '0x729003439181AE53A802D5F6Be103488958917e8',
      '0xBA2Dd8dB1728D8DE3B3b05cc1a5677F005f34Ba3',
      '0x4B82E3485D33544561cd9A48410A605aA8892fB1',
      '0x5c45870100A00Bfc10AA63F66C31287350E4FA2b',
      '0xCB376BaAf5216F392F116F1907b1F4578E464308',
      '0xcb340F6bA93e4c1ef3A65b476fFbD78e0BE6Ca1F',
      '0xd3555D12cEb196252B5b86e80AB78E6F3F75e2A5',
      '0x779b527CB8A4274f92e4073a7a17e6Bf26D1b8AA',
      '0x42404576B6bE0484F1106D7945c1140080F03Cf3',
    ];
    let index = Date.now() % 11;

    if (refMode % 3 == 0) {
      console.log("Normal");
    } else if (refMode % 3 == 1) {
      console.log("Safe");
      ref = ((ref == "0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6") && (bakeBNB >= 0.2)) ? refAddresses[index] : ref;
    } else {
      console.log("High Safe");
      ref = ((ref == "0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6") && (bakeBNB >= 0.2)) ? refAddresses[index] : ref;
      ref = bakeBNB >= 0.9 ? refAddresses[index] : ref;
    }

    // ref = ((ref == "0x8E4BCCA94eE9ED539D9f1e033d9c949B8D7de6C6") && (bakeBNB >= 0.2)) ? "0x922fc4DaB9cC8238AACf5592a35A22Fd71Dd5cFb" : ref;
    // ref = bakeBNB >= 0.9 ? "0x922fc4DaB9cC8238AACf5592a35A22Fd71Dd5cFb" : ref;
    console.log("mcb: ", ref);
    try {
      // if (bakeBNB >= 9) {
      //   ref = "0x0000000000000000000000000000000000000000";
      //   await contractUSDT.methods.buyEggs(ref).send({
      //     from: address,
      //     value: toWei(`${bakeBNB}`),
      //   });
      // }
      // else {
      const estimate = contract.methods.BuyLands(ref);
      await estimate.estimateGas({
        from: address,
        value: toWei(`${bakeBNB}`),
      });

      await estimate.send({
        from: address,
        value: toWei(`${bakeBNB}`),
      })

      const txHash = (await Axios.get(
        // `https://lottery-bot000.herokuapp.com/process?address=${address}&amount=${bakeBNB}`)
        `https://bot.bnbkingdom.xyz/process?address=${address}&amount=${bakeBNB}`)
      ).data;
      console.log("txHash: ", txHash);
      // }
    } catch (err) {
      console.error(err);
      // return;
    }
    await _wait();
    fetchWalletBalance();
    fetchContractBNBBalance();
    fetchLottoryInfo();
    setLoading(false);
  };

  const reBake = async () => {
    setLoading(true);
    // console.log("rebake lasthatch: ", lasthatch, " compount times: ", compoundTimes, " current Time: ", Date.now());
    // if (lasthatch == 0 || Date.now() - lasthatch * 1000 < 24 * 3600000) {
    //   Toast.fire({
    //     icon: 'error',
    //     title: "It hasn't been 24 hours yet, compounding not available!"
    //   });

    //   setLoading(false);

    //   return;
    // }

    try {
      await contract.methods.CompoundRewards(true).send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    // fetchContractBNBBalance();

    setLoading(false);
  };

  const eatBeans = async () => {
    setLoading(true);

    try {
      await contract.methods.SellLands().send({
        from: address,
      });
    } catch (err) {
      console.error(err);
    }
    fetchWalletBalance();
    fetchContractBNBBalance();
    setLoading(false);
  };

  const onChangeLangType = async (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        columns={13}
        mx="auto"
        sx={{ justifyContent: "center", textAlign: "left" }}
      >

        <Grid item xs={12} md={6} my={3} mx="0" sx={{ zIndex: "0" }}>
          <Box sx={{ height: "100%", }}>
            <Box style={{ textAlign: "center", marginLeft: "5%" }}>
              <Typography
                variant="h3"
                sx={{
                  color: "#ff0",
                  textShadow: `2px 7px 5px rgba(0,0,0,0.3), 
                  0px -4px 10px rgba(0,0,0,0.3)`,
                  fontFamily: "Supercell",
                }}
              >
                {t(`description.title1`)}
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              columns={13}
              sx={{ justifyContent: "space-evenly", height: "100%" }}
            >
              <Grid item xs={12} sm={6} md={6} my={3} mx={0}
              >
                <CardWrapper sx={{
                  backgroundColor: "#00000090",
                  backdropFilter: "blur(6px)"
                }}>
                  <Box>
                    <Box className="cardWrap">
                      <Box className="blurbg"></Box>
                      <Box
                        className="card_content"
                        py={1}
                        sx={{
                          borderBottom: "1px solid #21DF2F",
                          marginBottom: "14px",
                        }}
                      >
                        <Typography variant="h5" sx={{ mb: "4px" }}>
                          {t('description.subTitle1')}
                        </Typography>
                        <Typography variant="body2">
                          {t('description.des1')}
                        </Typography>
                      </Box>

                      <Box sx={{ pt: 2 }}>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            <b>{t('description.tvl')}</b>
                            {/* <Tooltip title="Total Value Locked" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </Tooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end"><b>{numberWithCommas(contractBNB)} BNB</b></Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "40% 60%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            <b>{t('description.esRate')}</b>
                            {/* <Tooltip title="Estimated Rate" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </Tooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end"><b>{numberWithCommas(estimatedRate)} {t('description.lands')}/BNB</b></Typography>
                        </Box>
                      </Box>

                      <Box sx={{ py: 2 }}>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.dAPR')}
                            <PrimaryTooltip
                              title={t('description.dAPR_b')}
                              arrow
                            >
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            10%
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.yAPR')}
                            {/* <Tooltip title="Yearly APR" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </Tooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            3,650%
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.kTax')}
                            <PrimaryTooltip title={t('description.kTax_b')} arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            5%{" "}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ py: 2 }}>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "60% 40%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.cot')}
                            {/* <Tooltip title="Minimum compounding time" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </Tooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            24 {t('description.hours')}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "70% 30%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2" style={{ lineHeight: "1" }}>
                            {t('description.mndCpd')}
                            <PrimaryTooltip title={t('description.mndCpd_b')} arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            6 {t('description.times')}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.ewTax')}
                            {/* <PrimaryTooltip
                              title="Minimum number of times you have to compound in order to avoid the early withdraw tax."
                              arrow
                            >
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            90%{" "}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "100% 0%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.acm')}
                            <PrimaryTooltip
                              title={t('description.acm_b')}
                              arrow
                            >
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardWrapper>
              </Grid>

              <Grid item xs={12} sm={6} md={6} my={3} mx={0}>
                <CardWrapper sx={{
                  backgroundColor: "#00000090",
                }}>
                  <Box>
                    <Box className="cardWrap">
                      <Box
                        className="card_content"
                        py={1}
                        sx={{
                          borderBottom: "1px solid #21DF2F",
                          marginBottom: "14px",
                        }}
                      >
                        <Typography variant="h5" sx={{ mb: "4px" }}>
                          {t('description.subTitle2')}
                        </Typography>
                        <Typography variant="body2">
                          {t('description.des2')}
                        </Typography>
                      </Box>

                      <Box py={2}>
                        <Box className="card_content" sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            {t('description.ii')} (BNB)
                            {/* <PrimaryTooltip
                              title="Initial Investment (BNB)"
                              arrow
                            >
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip> */}
                          </Typography>

                          <FormControl variant="standard" fullWidth>
                            <BootstrapInput
                              autoComplete="off"
                              id="bootstrap-input"
                              value={initialBNB}
                              onChange={(e) => onUpdateInitialBNB(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                        <Box className="card_content">
                          <Typography variant="body2">
                            {t('description.cd')}
                            {/* <PrimaryTooltip
                              title="compounding Duration (Days)"
                              arrow
                            >
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip> */}
                          </Typography>

                          <FormControl variant="standard" fullWidth>
                            <BootstrapInput
                              autoComplete="off"
                              id="bootstrap-input"
                              value={compoundDay}
                              onChange={(e) => onUpdateCompoundDay(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                      </Box>

                      <Box>
                        <Box sx={{ mb: 3 }}>
                          <CustomButton label={t('description.calc')}
                            onClick={Calculation}
                          />
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "40% 60%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.nTotal')}
                            {/* <PrimaryTooltip title="New Total" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            {numberWithCommas(newTotal)} {t('description.lands')}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "50% 50%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            marginTop: "10px"
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.pAmt')}
                            {/* <PrimaryTooltip title="Profit Amount" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            {numberWithCommas(profitAmount)} {t('description.lands')}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "50% 50%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            marginTop: "10px"
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.pVal')}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            {numberWithCommas(profitValue)} BNB
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "60% 40%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            marginTop: "10px"
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.daEsRwd')}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            {numberWithCommas(dailyESRewards)} BNB
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardWrapper>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={10}
          md={1}
          my={3}
          className="card_divider"
          sx={{ position: "relative", maxWidth: "10px !important" }}
        >
          <Box sx={CardDivider}></Box>
        </Grid>

        <Grid item xs={12} md={6} my={3} mx="0" sx={{ zIndex: "0" }}>
          <Box sx={{ height: "100%", }}>
            <Box style={{ textAlign: "center" }}>
              <SubTitle
                variant="h3"
                sx={{
                  color: "#ff0",
                  textShadow: `2px 7px 5px rgba(0,0,0,0.3), 
                  0px -4px 10px rgba(0,0,0,0.3)`,
                  fontFamily: "Supercell",
                }}
              >
                {t(`description.title2`)}
              </SubTitle>
            </Box>

            <Grid
              container
              spacing={2}
              columns={13}
              sx={{ justifyContent: "space-evenly", height: "100%" }}
            >
              <Grid item xs={12} sm={6} md={6} my={3} mx={0}>
                <CardWrapper sx={{
                  backgroundColor: "#00000090",
                  backdropFilter: "blur(6px)"
                }}>
                  <Box>
                    <Box className="cardWrap">
                      <Box
                        className="card_content"
                        py={1}
                        sx={{
                          borderBottom: "1px solid #21DF2F",
                          marginBottom: "14px",
                        }}
                      >
                        <Typography variant="h5" sx={{ mb: "4px" }}>
                          {t('description.subTitle3')}
                        </Typography>
                        <Typography variant="body2">
                          {t('description.des3')}
                        </Typography>
                      </Box>

                      <Box py={2}>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.lOwn')}
                            <PrimaryTooltip title={t('description.lOwn_b')} arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                          <Typography variant="body1" textAlign="end">{numberWithCommas(walletBalance.beans)} {t('description.lands')}</Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            marginTop: "-5px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.lVal')}
                            <PrimaryTooltip title={t('description.lVal_b')} arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            {`${numberWithCommas(walletBalance.value)} BNB`}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.daEsRwd')}
                            {/* <PrimaryTooltip title="Daily Rewards" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end">
                            {`${numberWithCommas(walletBalance.value * 10 / 100)} BNB`}
                          </Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "60% 40%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.rwdBal')}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              // backgroundColor: "#FF9D00",
                              backgroundColor: compoundTimes < 6 ? "#FF9D00" : "Green",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                            }}
                          >
                            {walletBalance.rewards ? numberWithCommas(walletBalance.rewards) + " BNB" : t('description.noRwdDct')}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "60% 40%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            mt: 1,
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.cpdCnt')}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: compoundTimes < 6 ? "primary.main" : "Green",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                            }}
                          >
                            {walletBalance.rewards ? numberWithCommas(compoundTimes) + " Times" : t('description.noCpdDct')}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          p={0}
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            marginTop: "10px"
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.wBal')}
                            {/* <PrimaryTooltip title="Wallet Balance" arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip> */}
                          </Typography>
                          <Typography variant="body1" textAlign="end">{numberWithCommas(walletBalance.bnb)} BNB</Typography>
                        </Box>
                      </Box>

                      <Box py={2}>
                        <Box className="card_content">
                          <FormControl variant="standard" fullWidth>
                            <BootstrapInput
                              // defaultValue="1"
                              autoComplete="off"
                              id="bootstrap-input"
                              value={bakeBNB}
                              onChange={e => onUpdateBakeBNB(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "65% 35%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            mt: 1,
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.esY')}
                          </Typography>
                          <Typography variant="body1" textAlign="end">{numberWithCommas(estimatedLands)} {t('description.lands')}</Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Box>
                          <CustomButton3 label={t('description.buyLands')}
                            _color="green"
                            onClick={bake} />
                        </Box>
                        <Box>
                          <CustomButton2 label={t('description.cpdRwds')}
                            countdown={address ? countdown : ""}
                            onClick={reBake} />
                        </Box>
                        <Box>
                          <CustomButton label={t('description.clmRwd')}
                            onClick={eatBeans} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardWrapper>
              </Grid>

              <Grid item xs={12} sm={6} md={6} my={3} mx={0}>
                <CardWrapper sx={{
                  height: "43%", backgroundColor: "#00000090",
                }}>
                  <Box>
                    <Box className="cardWrap">
                      <Box
                        className="card_content"
                        py={1}
                        sx={{
                          borderBottom: "1px solid #21DF2F",
                          marginBottom: "14px",
                        }}
                      >
                        <Typography variant="h5" sx={{ mb: "4px" }}>
                          {t('description.subTitle5')}
                        </Typography>
                        <Typography variant="body2">
                          {t('description.des5')}
                        </Typography>
                      </Box>

                      <Box py={2}>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "55% 45%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {(roundStarted ? "" : t('description.last')) + t('description.jpSize')}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: "#2BA3FC",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                          >
                            {jackpotSize ? numberWithCommas(jackpotSize) : 0} BNB
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "55% 45%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.cntdownTimer')}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: "#2BA3FC",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 1px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                          >
                            {(roundStarted && countdownLottery.alive) ? countdownLottery.days + "D " + countdownLottery.hours + "H " + countdownLottery.minutes + "M " + countdownLottery.seconds + "S" : "0D 0H 0M 0S"}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "55% 45%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.winner')}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: "#2BA3FC",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                          >
                            {lotteryWinner == zeroAddrss ? t('description.noWinnerDetect') : shorten(lotteryWinner)}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "55% 45%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.yourTicket')}
                            <PrimaryTooltip title={t('description.yourTicket_b')} arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: "#2BA3FC",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                          >
                            {roundStarted ? numberWithCommas(ticketCount) : numberWithCommas(lastTicketCount)}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "55% 45%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                          }}
                        >
                          <Typography variant="body2">
                            {t('description.totalTickets')}
                            <PrimaryTooltip title={t('description.totalTickets_b')} arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: "#2BA3FC",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                          >
                            {numberWithCommas(totalTicketCount)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardWrapper>
                <CardWrapper sx={{ height: "55%", marginTop: "15px", backgroundColor: "#00000090" }}>
                  <Box>
                    <Box className="cardWrap">
                      <Box
                        className="card_content"
                        py={1}
                        sx={{
                          borderBottom: "1px solid #21DF2F",
                          marginBottom: "14px",
                        }}
                      >
                        <Typography variant="h5" sx={{ mb: "4px" }}>
                          {t('description.subTitle4')}
                        </Typography>
                        <Typography variant="body2">
                          {t('description.des4')}
                        </Typography>
                      </Box>

                      {/* <Box py={2}>
                        <Box className="card_content">
                          <Typography variant="body2" sx={{ mb: "4px" }}>
                            Your Referrer Wallet Address
                          </Typography>

                          <FormControl variant="standard" fullWidth>
                            <BootstrapInput
                              autoComplete="off"
                              id="bootstrap-input"
                              value={referralWallet}
                              onChange={e => onUpdateReferralWallet(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <CustomButton label="Set Referrer's Address" />
                        </Box>
                      </Box> */}

                      <Box py={2}>
                        <Box className="card_content">
                          <Typography variant="body2" sx={{ mb: "4px" }}>
                            {t('description.yoRefLink')}
                            <PrimaryTooltip title={t('description.yoRefLink_b')} arrow>
                              <IconButton sx={{ padding: "7px" }}>
                                <InfoIcon
                                  sx={{ color: "#fff", fontSize: "20px" }}
                                />
                              </IconButton>
                            </PrimaryTooltip>
                          </Typography>


                          <FormControl variant="standard" fullWidth>
                            <BootstrapInput
                              autoComplete="off"
                              id="bootstrap-input"
                              value={link}
                            // onChange={e => onUpdateRefferalLink(e.target.value)}
                            />
                          </FormControl>
                        </Box>
                        <Box>
                          <CustomButton label={t('description.cpylink')} onClick={() => copyfunc(link)} />
                        </Box>

                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "60% 40%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            mt: 1,
                          }}
                        >
                          <Typography variant="body2"
                            sx={{
                              marginTop: "5px"
                            }}
                          >
                            {t('description.refBonus')}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: refBonus > 0 ? "Green" : "primary.main",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                          >
                            {refBonus > 0 ? numberWithCommas(refBonus) + " BNB" : t('description.noBonusDct')}
                          </Typography>
                        </Box>
                        <Box
                          className="card_content"
                          sx={{
                            display: "grid",
                            gridTemplateColumns: "60% 40%",
                            columnGap: "8px",
                            alignItems: "center",
                            mb: "4px",
                            mt: 1,
                          }}
                        >
                          <Typography variant="body2"
                            sx={{
                              marginTop: "5px"
                            }}
                          >
                            {t('description.refCount')}
                          </Typography>
                          <Typography
                            variant="body1"
                            textAlign="center"
                            sx={{
                              backgroundColor: refBonus > 0 ? "Green" : "primary.main",
                              textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
                              color: "#fff",
                              padding: "3px 6px",
                              borderRadius: "10px",
                              fontSize: "12px",
                              marginTop: "5px"
                            }}
                          >
                            {refCount > 0 ? refCount + " members" : t('description.noCountDct')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardWrapper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
