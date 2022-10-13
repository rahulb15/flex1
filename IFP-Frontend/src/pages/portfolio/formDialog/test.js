import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useDataFlow } from "../../../context/DataFlowContext";
import ListSubheader from '@mui/material/ListSubheader';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import MuiListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from '@mui/material/Box';



const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      maxWidth: 360,
    //   backgroundColor: theme.palette.background.paper
    }
  }));
  
  const ListItem = withStyles({
    root: {
      "&$selected": {
        color: "#003300",
      },
      "&$selected:hover": {
        color: "#7f0000",
      },
      "&:hover": {
        color: "#12005e",
      }
    },
    selected: {}
  })(MuiListItem);




export function ListItemComposition({sendDataToParent}) {
    const { technology } = useDataFlow();
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

  
    const handleListItemClick = (event, index, name) => {
      setSelectedIndex(index);
      console.log(name);
        sendDataToParent(name); // send data to parent 
    };

    // return list of technology names from technology array of objects and map to list items

    const technologyList = technology.map((ind) => {
        return (
            <ListItem 
            key={ind.id} 
            disablePadding
            selected={selectedIndex === ind.id}
            onClick={(event) => handleListItemClick(event, ind.id, ind.name)}
            style={{textTransform: "capitalize", fontWeight: "bold", color: "#12005e", fontSize: "1.5rem", fontFamily: "sans-serif" , backgroundColor: "#f2f2f2",
            borderRadius: "10px", padding: "10px", margin: "10px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            border: "1px solid #e6e6e6",
            borderLeft: "5px solid #e6e6e6",
            borderRight: "5px solid #e6e6e6",
            borderTop: "5px solid #e6e6e6",
            borderBottom: "5px solid #e6e6e6",
            height: "50px",
            transition: "0.3s",
            }}
            >
                <ListItemButton>
                    {/* <ListItemText primary={ind.name} style={{textTransform: "capitalize"}} /> */}
                    <ListItemText 
                    disableTypography
                    primary={<Typography type="body2" style={{textTransform: "capitalize", fontWeight: "bold"}}>
                        {ind.name}
                        </Typography>} />
                </ListItemButton>
            </ListItem>
        );
    }
    );

    // return list of industry names from industry array of objects and map to list items

    // const industryList = industry.map((ind) => {
    //     return (
    //         <ListItem key={ind.id} disablePadding>
    //             <ListItemButton>
    //                 <ListItemText primary={ind.name} />
    //             </ListItemButton>
    //         </ListItem>
    //     );
    // }
    // );



    return (
        <div>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',maxHeight: 300, overflow: 'auto' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader"
                    sx={{backgroundColor: "#b2dfdb",
                    borderRadius: "20px",
                    margin: "10px",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    fontFamily: "sans-serif",
                    color: "#12005e",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                    border: "1px solid #e6e6e6",
                    borderLeft: "5px solid #e6e6e6",
                    borderRight: "5px solid #e6e6e6",
                    borderTop: "5px solid #e6e6e6",
                    borderBottom: "5px solid #e6e6e6",
                    height: "50px",
                    // "&:hover": {
                    //     boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 12px 40px 0 rgba(0,0,0,0.19)",
                    //     borderLeft: "5px solid #12005e",
                    //     borderRight: "5px solid #12005e",
                    //     borderTop: "5px solid #12005e",
                    //     borderBottom: "5px solid #12005e",
                    //     color: "#12005e",
                    // }
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                
                }}>
                        Select Technology
                    </ListSubheader>
                }
            >
                <ListItem>
                    {/* <ListItemButton>
                        <ListItemText primary="Technology" />
                    </ListItemButton> */}
                    <List component="div" disablePadding>
                        {technologyList}
                    </List>
                </ListItem>
                {/* <ListItem>
                    <ListItemButton>
                        <ListItemText primary="Industry" />
                    </ListItemButton>
                    <List component="div" disablePadding>
                        {industryList}
                    </List>
                </ListItem> */}
            </List>
        </div>
    );
}



export function ListItemComposition1({sendDataToParent1}) {
    const { industry } = useDataFlow();
    const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index, name) => {
    setSelectedIndex(index);
    console.log(name);
        sendDataToParent1(name); // send data to parent
  };
  console.log("index", selectedIndex);
    // return list of industry names from industry array of objects and map to list items

    const industryList = industry.map((ind) => {
        return (
            <ListItem 
            key={ind.id} 
            disablePadding
            selected={selectedIndex === ind.id}
            onClick={(event) => handleListItemClick(event, ind.id, ind.name)}
            style={{textTransform: "capitalize", fontWeight: "bold", color: "#12005e", fontSize: "1.5rem", fontFamily: "sans-serif" , backgroundColor: "#f2f2f2",
            borderRadius: "10px", padding: "10px", margin: "10px",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            border: "1px solid #e6e6e6",
            borderLeft: "5px solid #e6e6e6",
            borderRight: "5px solid #e6e6e6",
            borderTop: "5px solid #e6e6e6",
            borderBottom: "5px solid #e6e6e6",
            height: "50px",
            transition: "0.3s",
            }}
            >
                <ListItemButton>
                    {/* <ListItemText primary={ind.name} style={{textTransform: "capitalize"}} /> */}
                    <ListItemText
                    disableTypography
                    primary={<Typography type="body2" style={{textTransform: "capitalize", fontWeight: "bold"}}>
                        {ind.name}
                        </Typography>} />
                </ListItemButton>
            </ListItem>

        );
    }
    );



    return (
        <div className={classes.root}>
            
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',maxHeight: 300, overflow: 'auto' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader"
                    sx={{backgroundColor: "#b2dfdb",
                    borderRadius: "20px",
                    margin: "10px",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    fontFamily: "sans-serif",
                    color: "#12005e",
                    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
                    border: "1px solid #e6e6e6",
                    borderLeft: "5px solid #e6e6e6",
                    borderRight: "5px solid #e6e6e6",
                    borderTop: "5px solid #e6e6e6",
                    borderBottom: "5px solid #e6e6e6",
                    height: "50px",
                    // "&:hover": {
                    //     boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2), 0 12px 40px 0 rgba(0,0,0,0.19)",
                    //     borderLeft: "5px solid #12005e",
                    //     borderRight: "5px solid #12005e",
                    //     borderTop: "5px solid #12005e",
                    //     borderBottom: "5px solid #12005e",
                    //     color: "#12005e",
                    // }
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                
                }}>
                        Select Industry
                    </ListSubheader>
                }
            >
                <ListItem>
                    <List component="div" disablePadding>
                        {industryList}
                    </List>
                </ListItem>
      </List>
        </div>
    );
   
}

