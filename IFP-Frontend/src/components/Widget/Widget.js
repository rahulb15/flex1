import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";
import { useDataFlow } from "../../context/DataFlowContext";
import { CSVLink, CSVDownload } from "react-csv";


// styles
import useStyles from "./styles";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  ...props
}) {
  var classes = useStyles();

  // local
  var [moreButtonRef, setMoreButtonRef] = useState(null);
  var [isMoreMenuOpen, setMoreMenuOpen] = useState(false);
  const { siteMember, industry, technology, feature, portfolio } = useDataFlow();


  return (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        <div className={classes.widgetHeader}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary">
                {title}
              </Typography>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  buttonRef={setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        {/* <MenuItem>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Print</Typography>
        </MenuItem> */}
       {title === "Portfolio" && (
        <CSVLink data={portfolio} filename={"portfolio.csv"}>
          <MenuItem>
            <Typography>Download CSV</Typography>
          </MenuItem>
        </CSVLink>
      )}
      {title === "Site Members" && (
        <CSVLink data={siteMember} filename={"siteMember.csv"}> 
          <MenuItem> 
            <Typography>Download CSV</Typography>
          </MenuItem>
        </CSVLink>  
      )}
      {title === "Industry" && (  
        <CSVLink data={industry} filename={"industry.csv"}>
          <MenuItem>
            <Typography>Download CSV</Typography>
          </MenuItem>
        </CSVLink>
      )}
      {title === "Technology" && (
        <CSVLink data={technology} filename={"technology.csv"}>
          <MenuItem>
            <Typography>Download CSV</Typography>
          </MenuItem>
        </CSVLink>
      )}
      {title === "Features" && (
        <CSVLink data={feature} filename={"feature.csv"}>
          <MenuItem>
            <Typography>Download CSV</Typography>
          </MenuItem>
        </CSVLink>
      )}

      </Menu>
    </div>
  );
}
