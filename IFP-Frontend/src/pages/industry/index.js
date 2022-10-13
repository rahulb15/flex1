import React from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import IndustryTable from "./table/IndustryTable"



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

const styles = theme => ({
    paper: {
        padding: theme.spacing(0),
    },
    paperTable: {
        padding: theme.spacing(0),
    }
})

const Portfolio = ({ classes, ...props }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        }
    return (
      <div>
        {/* <PageTitle title="Portfolio" /> */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example" 
              >
                <LinkTab label="Industry" {...a11yProps(0)} />
              </Tabs>
              <TabPanel value={value} index={0}>
                <IndustryTable />
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
}

export default withStyles(styles, { withTheme: true })(Portfolio);
















// import React from "react";
// import { Paper, Grid, withStyles } from '@material-ui/core';
// import PageTitle from "../../components/PageTitle/PageTitle";
// import './style.css';
// import IndustryTable from "./table/IndustryTable"

// const styles = theme => ({
//     paper: {
//         padding: theme.spacing(0),
//     },
//     paperTable: {
//         padding: theme.spacing(0),
//     }
// })

// const Industry = ({ classes, ...props }) => {
//     return (
//         <React.Fragment>
//             {/* <PageTitle title="Industry" /> */}
//             <Grid container spacing={4}>
//                 <Grid item xs={12} >
//                     <Paper className={classes.paper}>
//                         <IndustryTable />
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </React.Fragment>
//     );
// }


// export default (withStyles(styles)(Industry));