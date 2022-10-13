import React, { useState, useEffect ,useContext} from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  ArrowBack as ArrowBackIcon,
  Person as AccountIcon,

} from "@material-ui/icons";
import PublicIcon from '@material-ui/icons/Public';

import BusinessIcon from '@material-ui/icons/Business';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";



// styles
import useStyles from "./styles";
import "./scrollbar.css";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

import { AuthContext } from "../../context/AuthContext";



function Sidebar({ location } ) {
  var classes = useStyles();
  var theme = useTheme();
  const {getAuthUser} = useContext(AuthContext);
  const authUser = getAuthUser();
  let structure=[];
 
  if(authUser.role=="admin"){
   structure = [
    { id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> },
    { id: 1, label: "Manage Permissions", link: "/permission", icon: <LockOpenIcon /> },
    { id: 2, label: "Site Members", link: "/user", icon: <AccountIcon /> },
    { id: 3, label: "Industry", link: "/industry", icon: <BusinessIcon /> },
    { id: 4, label: "Technology", link: "/technology", icon: <PublicIcon /> },
    { id: 5, label: "Features", link: "/features", icon: <LibraryIcon /> },
    { id: 6, label: "Portfolio", link: "/portfolio", icon: <LibraryIcon /> },
  ];
  }else{
  structure.push({ id: 0, label: "Dashboard", link: "/dashboard", icon: <HomeIcon /> })
  if(authUser.site)
  structure.push({ id: 2, label: "Site Members", link: "/user", icon: <AccountIcon /> })
  if(authUser.industry)
  structure.push({ id: 3, label: "Industry", link: "/industry", icon: <BusinessIcon /> })
  if(authUser.technology)
  structure.push( { id: 4, label: "Technology", link: "/technology", icon: <PublicIcon /> })
  if(authUser.features)
  structure.push({ id: 5, label: "Featurs", link: "/features", icon: <LibraryIcon /> })
  if(authUser.portfolio)
  structure.push({ id: 6, label: "Portfolio", link: "/portfolio", icon: <LibraryIcon /> })

}
  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <div>
        <List className={classes.sidebarList}>
          { structure.map(link => (
            <SidebarLink
              key={link.id} 
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
          ))}
        </List>
      </div>
      
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
