import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

import "./forgetPassword.css";


const useStyles = makeStyles((theme) => ({
  // h1: {
  //   position: "relative",
  //   textTransform: "uppercase",
  //   letterSpacing: "0.1em",
  //   fontSize: "10vw",
  //   fontWeight: "bold",
  //   textDecoration: "none",
  //   color: "#3f51b5",
  //   display: "inline-block",
  //   backgroundSize: "200% auto",
  //   webkitBackgroundClip: "text",
  //   webkitTextFillColor: "transparent",
  //   animation: "$gradient 15s ease infinite",
  //   "&:hover": {
  //     animation: "shake 0.82s cubic-bezier(.36,.07,.19,.97) both",
  //     transform: "translate3d(0, 0, 0)",
  //     backfaceVisibility: "hidden",
  //     perspective: "1000px",
  //   },
  // },
  // "@keyframes gradient": {
  //   "0%": {
  //     backgroundPosition: "0% 50%",
  //   },
  //   "50%": {
  //     backgroundPosition: "100% 50%",
  //   },
  //   "100%": {
  //     backgroundPosition: "0% 50%",
  //   },
  // },
  // "@keyframes shake": {
  //   "10%, 90%": {
  //     transform: "translate3d(-1px, 0, 0)",
  //   },

  //   "20%, 80%": {
  //     transform: "translate3d(2px, 0, 0)",
  //   },

  //   "30%, 50%, 70%": {
  //     transform: "translate3d(-4px, 0, 0)",
  //   },

  //   "40%, 60%": {
  //     transform: "translate3d(4px, 0, 0)",
  //   },
  // },

}));


const ForgetPassword = () => {
  const [values, setValues] = React.useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
    const handleClickShowConfirmPassword = () => {
    setValues({ ...values, showConfirmPassword: !values.showConfirmPassword });
    };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    };
  const handlePasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  console.log(values);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    console.log(data);
  };

  return (
    <div>
        <Box>
        <Typography 
        variant="h1"
        // className={classes.h1} 
        component="div" 
        utterBottom
        sx={{textAlign:"center", fontWeight:"bold", color:"#3f51b5", marginTop:"60px", fontFamily:"sans-serif", transform:"translateY(350px) translateX(50px) rotate(0deg) scale(2.5)", textShadow:"0px 0px 10px #3f51b5", animation:"shake 0.82s cubic-bezier(.36,.07,.19,.97) both", transform:"translate3d(0, 0, 0)", backfaceVisibility:"hidden", perspective:"1000px", "@keyframes shake": {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0)",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },}}>
        
            {/* <span style={{marginRight:"250px", color:"#3f51b5",marginLeft:"-35px"}}>Fle<span style={{color:"#f50057"}}>x</span></span><span style={{color:"#f50057",marginRight:"60px"}}>s<span style={{color:"#3f51b5",marginRight:"10px"}}>in</span></span> */}
            FLE<span style={{color:"#f44336"}}>X</span>SIN
        </Typography>
        </Box>
        {/* <Box>
        <Typography 
        variant="h1" 
        component="div" 
        utterBottom
        className={classes.h1}
        >
            FLEXSIN
        </Typography>
        </Box> */}
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        width: "500px",
        height: "500px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <h1
        style={{
          color: "black",
          fontSize: "30px",
          fontWeight: "bold",
          marginBottom: "60px",
        }}
        className="h2"
      >
        Enter New Password
      </h1>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "30ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-password-input"
            label="Password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handlePasswordChange("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>

        <div>
          <TextField
            id="outlined-password-input"
            label="Confirm Password"
            type={values.showConfirmPassword ? "text" : "password"}
            value={values.confirmPassword}
            onChange={handlePasswordChange("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showConfirmPassword ? ( <Visibility /> ) : ( <VisibilityOff /> )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        </Box>
        <Button
            variant="contained"
            style={{
                backgroundColor: "#f50057",
                color: "white",
                marginTop: "30px",
                width: "200px",
                height: "50px",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "60px",
                }}
            onClick={handleSubmit}
            >
                Submit
            </Button>
        </div>
    </div>
    );
    };
export default ForgetPassword;
