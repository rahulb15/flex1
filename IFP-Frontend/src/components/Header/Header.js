import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Button
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  Person as AccountIcon,
  ArrowBack as ArrowBackIcon
} from "@material-ui/icons";
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import dlogo from '../../images/dashblogo.png'
import change_pass from "../change_password/change_pass";

import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { AuthContext } from "../../context/AuthContext";

export default function Header(props) {
  // global
  const classes = useStyles();
  const { logout, getAuthUser, change_password } = useContext(AuthContext)
  
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const authUser = getAuthUser();

  // local
  var [profileMenu, setProfileMenu] = useState(null);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        
        <Typography variant="h6" weight="medium" className={classes.logotype}>
        Flexsin
        </Typography>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <div className={classes.grow} />

        
          <span className={classes.username} style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
            {authUser.name}
            </span>
        

        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountCircleIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h6" weight="medium" color="primary">
              {authUser.email}
            </Typography>
          </div>

          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>

          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
            onClick={() => change_password(props.history)}
          >
            <VpnKeyIcon className={classes.profileMenuIcon}  /> Change Password
          </MenuItem>

          <div className={classes.logoutMenu}>
            <Button
              variant="contained" 
              color="secondary"
              className={classes.logoutMenuButton}
              onClick={() => logout(props.history)}
            >
              Sign Out
            </Button>
          </div>

        </Menu>
      </Toolbar>
    </AppBar>
  );
}
