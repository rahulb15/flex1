import React from "react";
import { Paper, Grid, withStyles } from '@material-ui/core';
import PageTitle from "../../components/PageTitle/PageTitle";
import './style.css';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import PortfolioTable from "./table/portfolioTable" ;
import Search from "./search/Search";


function TabPanel(props) {
  console.log("da",props)
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
                            <LinkTab label="Portfolio" {...a11yProps(0)} />
                            <LinkTab label="Search Listing" {...a11yProps(1)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            <PortfolioTable />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Search />
                        </TabPanel>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default withStyles(styles, { withTheme: true })(Portfolio);