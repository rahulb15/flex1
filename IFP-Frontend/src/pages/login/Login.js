import React, { useState, useContext } from "react";
import ForgetPWD from "./ForgetPWD";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// logo
import logo from "../../images/flexsin_logo.jpg";
import google from "../../images/google.svg";

// context
// import { useUserDispatch, loginUser, registerUser } from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";
import { useCount } from "../../context/CountContext";

function Login(props) {
  const classes = useStyles();


  // global
  // var userDispatch = useUserDispatch();
  const { login, register } = useContext(AuthContext)
  const { count, incrementCount, decrementCount, resetCount } = useCount();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [errorMessage, setErrorMessage] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [emailValue, setEmailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  

  const handleChangeTab = (id) => {
    setActiveTabId(id)
    // setErrorMessage(null)
  }

  const handleLogin = () => {
    login(
      emailValue,
      passwordValue,
      props.history,
      setIsLoading,
      setErrorMessage
    )
  }

  const handleRegister = () => {
    register(
      emailValue,
      nameValue,
      passwordValue,
      props.history,
      setIsLoading,
      setErrorMessage,
    )
  }

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}></Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => handleChangeTab(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Administration Login" classes={{ root: classes.tab }} />
           
          </Tabs>

          {activeTabId === 0 && (
            <React.Fragment>

                {errorMessage && (
                  <Fade in={true}>
                    <Typography color="secondary" className={classes.errorMessage}>
                      {errorMessage}
                    </Typography>
                  </Fade>
                )}

                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  margin="normal"
                  label="Email"
                  placeholder="Email"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
                  margin="normal"
                  label="Password"
                  placeholder="Password"
                  type="password"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                  ) : (

                    <Button
                      disabled={
                        emailValue.length === 0 || passwordValue.length === 0
                      }
                      onClick={handleLogin}
                      variant="contained"
                      color="primary"
                      size="large"
                    >
                      Login
                    </Button>
                    

                  )}
                  {errorMessage && (
                    // <Button
                    //   color="primary"
                    //   size="large"
                    //   className={classes.forgetButton}
                    // >
                    //   Forget Password
                    // </Button>
                    <ForgetPWD  />
                  )}
                  {/* <Button
                    disabled={
                      emailValue.length === 0 || passwordValue.length === 0
                    }
                    onClick={handleRegister}
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    Forget Password
                  </Button> */}
                  
                </div>
              
            </React.Fragment>
          )}
          {/* {activeTabId === 1 && (
            <React.Fragment>
              
              {errorMessage && (
                <Fade in={true}>
                  <Typography color="secondary" className={classes.errorMessage}>
                    {errorMessage}
                  </Typography>
                </Fade>
              )}
              <TextField
                id="name"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                margin="normal"
                label="Name"
                placeholder="Name"
                type="text"
                fullWidth
              />
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                margin="normal"
                label="Email"
                placeholder="Email"
                type="email"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                margin="normal"
                label="Password"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={
                      emailValue.length === 0 ||
                      passwordValue.length === 0 ||
                      nameValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button
                size="large"
                className={classnames(
                  classes.googleButton
                )}
              >
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )} */}

        </div>
        <Typography color="primary" className={classes.copyright}>
          © 2022 Flexsin, All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
