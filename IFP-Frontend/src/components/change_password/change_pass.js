import React, { useState, useContext } from "react";
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
import logo from '../../images/flexsin_logo.jpg'

// styles
import useStyles from "./styles";

// context
// import { useUserDispatch, loginUser, registerUser } from "../../context/AuthContext";
import { AuthContext } from "../../context/AuthContext";
import Header from "../Header/Header";

function ChangePass(props) {
  const classes = useStyles();

  // global
  // var userDispatch = useUserDispatch();
  const { reset_password } = useContext(AuthContext)

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [errorMessage, setErrorMessage] = useState(null);
  var [activeTabId, setActiveTabId] = useState(0);
  var [old_passwordValue, setOld_passwordValue] = useState("");
  var [pass1Value, setPass1Value] = useState("");
  var [new_passwordValue, setNew_passwordValue] = useState("");

  const handleChangeTab = (id) => {
    setActiveTabId(id)
    // setErrorMessage(null)
  }

  const handlepassword = () => {
    reset_password(
      old_passwordValue,
      pass1Value,
      new_passwordValue,
      props.history,
      setIsLoading,
      setErrorMessage,
    )
  }

  return (
    <Grid container className={classes.container}>
      <Header/>
      <div className={classes.logotypeContainer}>
      
      <img src={logo} alt="logo" className={classes.logotypeImage} />
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
            
            <Tab label="Change Password" classes={{ root: classes.tab }} />
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
                id="old_pass"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={old_passwordValue}
                onChange={e => setOld_passwordValue(e.target.value)}
                margin="normal"
                label="Old Password"
                placeholder="Old Password"
                type="password"
                fullWidth
              />
              <TextField
                id="new_pass"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={pass1Value}
                onChange={e => setPass1Value(e.target.value)}
                margin="normal"
                label="New Password"
                placeholder="New Password"
                type="password"
                fullWidth
              />
              <TextField
                id="con_new_pass"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={new_passwordValue}
                onChange={e => setNew_passwordValue(e.target.value)}
                margin="normal"
                label="Confirm New Password"
                placeholder="Confirm New Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={handlepassword}
                    disabled={
                      old_passwordValue.length === 0 ||
                      pass1Value.length === 0 ||
                      new_passwordValue.length === 0
                    }
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                   Change Password
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}

        </div>
      </div>
    </Grid>
  );
}

export default withRouter(ChangePass);
