import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemButton from "@mui/material/ListItemButton";
import { FixedSizeList } from "react-window";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import AddIcon from "@mui/icons-material/Add";
import { Tooltip } from "@mui/material";
import { useDataFlow } from "../../../context/DataFlowContext";
import { ListItemComposition, ListItemComposition1 } from "./test";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { toast } from 'react-toastify';
import EditIcon from '@material-ui/icons/Edit';
// import EditIcon2 from '@mui/icons-material/Edit';
import EditIcon2 from '@mui/icons-material/Save';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function RedBar() {
  return (
    <Box
      sx={{
        height: 10,
        backgroundColor: (theme) =>
          theme.palette.mode === "light" ? "#e0e0e0" : "rgb(255 132 132 / 25%)",
      }}
    />
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  content: {
    justifyContent: "center",
  },
});

export default function FullScreenDialog(props) {
    console.log("propsPORT", props)
  const [expanded, setExpanded] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const {
    siteMember,
    industry,
    technology,
    feature,
    portfolio,
    setPortfolioData,
  } = useDataFlow();
  const [data, setData] = React.useState({
    id: props.id,
    project_name: props.project_name,
    live_url: props.live_url,
    staging_url: props.staging_url,
    user_login: props.user_login,
    user_password: props.user_password,
    staging_admin_url: props.staging_admin_url,
    admin_user_login: props.admin_user_login,
    admin_password: props.admin_password,
    technology: props.technology,
    industry: props.industry,
    feature: props.feature,
  });
  // function arrayKey(props){
  //   console.log("OnSelect",props);
  //   // return props.key
  // }
  console.log("TESTING ARRAY", data);

  const sendDataToParent = (index) => {
    // the callback. Use a better name
    console.log(index);
    setData({ ...data, technology: index });
  };

  const sendDataToParent1 = (index) => {
    // the callback. Use a better name
    console.log(index);
    setData({ ...data, industry: index });
  };

  let name, value;
  const handleInputChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    console.log(name, value);
    setData({ ...data, [name]: value });//...data is used to copy the previous data and then add the new data
  };





  const handleSubmits = (e) => {
    e.preventDefault();
    console.log(data);
    //send data to backend using axios by bearer token
    axios
      .put(`http://localhost:3002/api/portfolio/${props.id}`, data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPortfolioData();
        toast.success("Portfolio Added Successfully");
        handleClose();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
    setData({ ...data, industry: "" });
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
    setData({ ...data, technology: "" });
  };
  const map = feature.map((item) => {console.log("ITEM", item)
    const options = item.property_name.map((option) => {
      const firstLetter = option.name[0].toUpperCase();
      console.log("firstLetter", firstLetter);
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });
    // console.log("options", options);
    // temp[count++] = item.name;
    // temp = item.name;

    console.log("data", data);
    return (
      <div style={{ marginTop: 20 }}>
        <RedBar />
        <div style={{ display: "flex", flexDirection: "row", marginRight: 135 }}>

          <div style={{ width: "100%", marginLeft: "10px", height: "100%" ,marginTop:20 ,marginBottom:20}}>
            {/* <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              // groupBy={(option) => option.firstLetter}
              // options={item.property_name.map((item) => item.name)}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                // console.log("selected", selected),
                // console.log("option", option),
                // console.log("props", props),
                // console.log("props", props.key, props["aria-selected"]),
                (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                          onChange={(e) => {
                            // console.log("e", e.target.checked);
                            // console.log("option", option);
                            // console.log("props", props);
                            // console.log("props", props.key, props["aria-selected"]);
                            setData({
                              ...data,
                              feature: {
                                ...data.feature,
                                [item.name]: {
                                  ...data.feature[item.name],
                                  [option.name]: e.target.checked,
                                  // [props.key]: e.target.checked,
                                },
                              },
                            });
                          }}
                        />
                        {option.name}
                      </li>
                    )
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={item.name}
                  color="primary"
                  placeholder={`Select ${item.name}`}
                />
              )}
            /> */}
            <Multiselect
              avoidHighlightFirstOption={true}
              placeholder={`Select ${item.name}`}
              showCheckbox={true}
              onSearch={(e) => console.log(e)} // logs the value entered in search input
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              displayValue="name"
              onSelect={(selectedList, selectedItem) => {
                console.log("selectedList", selectedList);
                console.log("selectedItem", selectedItem);
                setData({
                  ...data,
                  feature: {
                    ...data.feature,
                    [item.name]: {
                      ...data.feature[item.name],
                      [selectedItem.name]: true,
                      // [props.key]: e.target.checked,
                    },
                  },
                });
              }}
              onRemove={(selectedList, removedItem) => {
                console.log("selectedList", selectedList);
                console.log("removedItem", removedItem);
                setData({
                  ...data,
                  feature: {
                    ...data.feature,
                    [item.name]: {
                      ...data.feature[item.name],
                      [removedItem.name]: false,
                      // [props.key]: e.target.checked,
                    },
                  },
                });
              }}
             
              style={{
                chips: {
                  background: "#3f51b5",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  fontSize: 12,
                  fontWeight: 600,
                  height: 20,
                  borderRadius: 10,
                  padding: "0 5px",
                  margin: 2,
                  float: "left",
                  flexWrap: "wrap",
                  flexDirection: "row",
                },
                searchBox: {
                  // border: "none",
                  borderBottom: "1px solid #ccc",
                  borderRadius: "3px",
                  boxShadow: "2px 2px 2px #ccc",
                  height: "60px",
                  textAlign: "center",
                },
                // multiselectContainer: {
                //   width: "140%",
                // },
                optionContainer: {
                  width: "100%",
                },
                option: {
                  color: "black",
                  width: "100%",
                },
                inputField: {
                  textAlign: "center",
                  marginTop: "12px",
                  fontSize: "16px",
                },
              }}
              
            />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      {/* <IconButton aria-label="add" onClick={handleClickOpen} color="primary">
        <AddCircleIcon style={{ fontSize: "40px" }} />
      </IconButton> */}
      <IconButton color="primary" onClick={handleClickOpen}>
          <EditIcon />
      </IconButton>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#9575cd" }}>
          <Toolbar>
            <div class="container text-center">
              <div class="row">
                <div class="col" style={{ textAlign: "left" }}>
                  <Tooltip title="Close" placement="right">
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                      justifyContent="left"
                    >
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </div>
                <div class="col" style={{ textAlign: "center" }}>
                  <Typography
                    // sx={{ ml: 2, flex: 1 }}
                    variant="h6"
                    component="div"
                    weight="medium"
                    textTransform={"uppercase"}
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "white",
                    }}
                    letterSpacing={3}
                  >
                    Edit Listing
                  </Typography>
                </div>
                <div class="col" style={{ textAlign: "right" }}>
                  <Tooltip title="Save" placement="left">
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleSubmits}
                      aria-label="close"
                      justifyContent="right"
                    >
                      {/* <AddCircleIcon style={{ fontSize: "30px" }} /> */}
                      {/* <AddIcon /> */}
                      <EditIcon2 />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <div
          style={{
            marginBottom: "30px",
            marginTop: "30px",
            marginLeft: "18px",
          }}
        >
          <Typography
            style={{
              fontSize: "13px",
              fontWeight: "bold",
              color: "#00251a",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontFamily: "sans-serif",
              textShadow: "1px 1px 1px #484848",
            }}
          >
            Add Portfolio
          </Typography>
        </div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "35ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              required
              id="outlined-required"
              label="Project Name :"
              name="project_name"
              value={data.project_name}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Live URL :"
              name="live_url"
              value={data.live_url}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Staging URL :"
              name="staging_url"
              value={data.staging_url}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="User Login :"
              name="user_login"
              value={data.user_login}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="User Password :"
              name="user_password"
              value={data.user_password}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Staging Admin URL :"
              name="staging_admin_url"
              value={data.staging_admin_url}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-required"
              label="Admin User Login :"
              name="admin_user_login"
              value={data.admin_user_login}
              onChange={handleInputChange}
            />
            <TextField
              required
              id="outlined-required"
              label="Admin Password :"
              name="admin_password"
              value={data.admin_password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <hr
              style={{
                marginBottom: "30px",
                marginTop: "30px",
                border: "4px solid #4f9a94",
              }}
            />
          </div>
          <div>
            <div>
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  // classes={{ content: classes.content }}
                >
                  <Typography
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#00251a",
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      fontFamily: "sans-serif",
                      textShadow: "1px 1px 1px #484848",
                    }}
                  >
                    Industry
                  </Typography>
                  {data.industry.length > 0 ? (
                    <Chip
                    variant="outlined"
                    color="success"
                    size="small"
                    label={data.industry}
                    style={{ marginLeft: "132px" }}
                    onDelete={handleClick}
                    onMouseEnter = {() => setHover(true)}
                    onMouseLeave = {() => setHover(false)}
                    deleteIcon={<IconButton
                      aria-label="delete"
                      size="small"
                      // onClick={handleClick}
                    >
                      {/* <DoneIcon /> */}
                      {/* <CloseIcon fontSize="inherit" /> */}
                      {hover ? <CloseIcon fontSize="inherit" /> : <DoneIcon />}
                      
                    </IconButton>}
                    />
                  ) : (
                    ""
                  )}

                  {/* <Chip
                  variant="outlined"
                  color="success"
                  size="small"
                  label= {data.industry}
                  style={{ marginLeft: "100px" }}
                  onClick={handleClick}
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                /> */}
                </AccordionSummary>
                <AccordionDetails>
                  <ListItemComposition1 sendDataToParent1={sendDataToParent1} />
                </AccordionDetails>
              </Accordion>
            </div>
            <div>
              <hr
                style={{
                  marginBottom: "30px",
                  marginTop: "30px",
                  border: "4px solid #5c6bc0",
                }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                  // classes={{ content: classes.content }}
                >
                  <Typography
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      color: "#00251a",
                      textTransform: "uppercase",
                      letterSpacing: "3px",
                      fontFamily: "sans-serif",
                      textShadow: "1px 1px 1px #484848",
                    }}
                  >
                    Technology
                  </Typography>
                  {data.technology.length > 0 ? (
                    <Chip
                    variant="outlined"
                    color="success"
                    size="small"
                    label={data.technology}
                    style={{ marginLeft: "100px" }}
                    // onClick={handleClick}
                    onDelete={handleDelete}
                    onMouseEnter = {() => setHover(true)}
                    onMouseLeave = {() => setHover(false)}
                    deleteIcon={<IconButton
                      aria-label="delete"
                      size="small"
                      // onClick={handleClick}
                    >
                      {/* <DoneIcon /> */}
                      {/* <CloseIcon fontSize="inherit" /> */}
                      {hover ? <CloseIcon fontSize="inherit" /> : <DoneIcon />}
                      
                    </IconButton>}
                    />
                  ) : (
                    ""
                  )}
                  {/* <Chip
                  variant="outlined"
                  color="success"
                  size="small"
                  label={data.technology}
                  style={{ marginLeft: "100px" }}
                  onClick={handleClick}
                  onDelete={handleDelete}
                  deleteIcon={<DoneIcon />}
                /> */}
                </AccordionSummary>
                <AccordionDetails>
                  <ListItemComposition sendDataToParent={sendDataToParent} />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
          <div>
            <hr
              style={{
                marginBottom: "30px",
                marginTop: "30px",
                border: "4px solid #5c6bc0",
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "30px",
              marginTop: "30px",
              marginLeft: "18px",
            }}
          >
            <Typography
              style={{
                fontSize: "13px",
                fontWeight: "bold",
                color: "#00251a",
                textTransform: "uppercase",
                letterSpacing: "3px",
                fontFamily: "sans-serif",
                textShadow: "1px 1px 1px #484848",
              }}
            >
              Features
            </Typography>

            <div style={{ marginTop: 20 }}>
              <RedBar />
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", backgroundColor: "#f5f5f5", padding: 10, borderRadius: 40,
              border: "1px solid #4f9a94",
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 10,
              marginRight: 10,
              }}>
                {map}
              </div>
              <RedBar />
            </div>
          </div>
        </Box>
      </Dialog>
    </div>
  );
}
