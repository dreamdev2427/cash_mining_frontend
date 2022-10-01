import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useDispatch } from 'react-redux';
import { SetLang } from '../../redux/data/dataActions';
import UnstyledSelectRichOptions from '../../components/SelectCoin';

const LanguageSelector = styled(Select)(({ theme }) => ({
    width: "180px",
    textAlign: "center",
    paddingTop:"10px",
    marginLeft: "6%",
    textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
    borderRadius: "5px",
    // border: "1px solid #d8a909",
    fontWeight: "400",
    fontSize: "1.2rem",
    lineHeight: 1,
    outline: "0px",
    backgroundColor: "#d8a909",
    // backgroundImage: "linear-gradient(90deg, rgba(255,50,20,0.75), rgba(253, 136, 53, 0.75))",
    backgroundImage: "linear-gradient(90deg, hsla(37, 100%, 50%, 0.75) 0%, hsla(48, 97%, 55%, 0.75) 100%)",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
        display: "none",
    },
}));

const SmallScreenLanguageSelector = styled(Select)(({ theme }) => ({
    display: "none",
    // width:"150px",
    marginTop: "20px",
    marginBottom: 0,
    textShadow: "3px 2px 3px rgb(0 0 0 / 78%)",
    textAlign: "center",
    width: "45%",
    // paddingLeft:"1%",
    backgroundColor: "#d8a909",
    marginLeft: "auto",
    marginRight: "auto",
    fontWeight: "400",
    fontSize: "1rem",
    backgroundImage: "linear-gradient(90deg, hsla(37, 100%, 50%, 0.75) 0%, hsla(48, 97%, 55%, 0.75) 100%)",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
        display: "block",
    },
}));

const LanguageSelect = ({responsive = true}) => {

    const dispatch = useDispatch();
    const [languageType, setLanguageType] = useState('en');
    const onChangeLangType = async (lng) => {
        setLanguageType(lng);
        dispatch(SetLang(lng));
    }

    useEffect(()=> {
        onChangeLangType("en");
        console.log("en in useEffect");
    }, []);

    return (<UnstyledSelectRichOptions value = {languageType} onChange = {onChangeLangType} responsive = {responsive}/>);
}

export default LanguageSelect;