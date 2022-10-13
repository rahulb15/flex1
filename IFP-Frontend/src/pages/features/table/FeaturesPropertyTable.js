import React, { useEffect,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";
//////////////////
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { IconButton } from "@material-ui/core";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "property_name", label: "Property Name", minWidth: 100 },
  { id: "register_date", label: "Register Date", minWidth: 170 },
];

function createData(name, property_name, register_date) {
  return { name, property_name, register_date };
}



const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

const [features, setFeatures] = React.useState('');
const [select, setSelect] = React.useState('');
const [open, setOpen] = React.useState(false);
const [dataTables, setDataTables] = useState([]);

console.log("dataTables",dataTables);

  const handleChangeFeatures = (event) => {
    setFeatures(event.target.value);
};

const handleChange = (event) => {
    setSelect(event.target.value);
};

const handleClose = () => {
    setOpen(false);
};

const handleOpen = () => {
    setOpen(true);
};

useEffect(() => {
  axios
  .get("http://localhost:3002/api/features/list", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
  .then((response) => {
    setDataTables(response.data.length>0 ?response.data:'');
  })
  .catch((error) => {
    toast.error("Error");
      console.log(error);
  });
}, []);

const array = [];

const pushToArray = dataTables.map((row) => {
  row.property_name.map((row2) => {
    array.push(createData(row.name, row2.name, row.register_date));
  })
});

const rows = array.map((row) => {
  return createData(row.name, row.property_name, row.register_date);
});

const handleAdd = () => {
  if (features === '' || select === '') {
    toast.error("Please fill in the blanks");
  } else {
    const data = {
      name: features,
      property_name: select,
    };
    axios
      .post("http://localhost:3002/api/features/add", data, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        toast.success("Added");
        setDataTables([...dataTables, response.data]);
      })
      .catch((error) => {
        toast.error("Error");
        console.log(error);
      });
  }
};


  function handleSubmmit() {
    console.log("submit1", features);
    console.log("submit2", select);
    if (features === '' || select === '') {
    toast.error("Please fill in the blanks");
  }
  else {
    axios
      .post( "http://localhost:3002/api/features/createProperty/" + select, {
        name: features
      }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        toast.success('Data succesfully updated');
        console.log("res",response.data);
        setDataTables([...dataTables, response.data]);
        // window.location.reload();
      })
      .catch((error) => {
        toast.error("Data not updated");
        console.log(error);
      });
  }
  }
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      {pushToArray}
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3} style={{display: 'flex', justifyContent: 'center'}}>
                            <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
                                <InputLabel id="demo-controlled-open-select-label">Features</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={select}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    
                                    {dataTables.map((item) => (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                    </Grid>
                    <Grid item xs={3} style={{display: 'flex', alignItems: 'center'}}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Property Name"
                                multiline
                                rows={1}
                                defaultValue=""
                                value={features}
                                onChange={handleChangeFeatures}
                                // defaultValue="Default Value"
                            />
                    </Grid>
                    <Grid item xs={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Fab color="primary" aria-label="add"
                             sx={{ transform: 'scale(0.6) translate(150px, 0px)' }}>
                              <IconButton
                                aria-label="add"
                                style={{ transform: 'scale(2.5)', color: 'white' }}
                                onClick={handleSubmmit}
                              >
                                <AddIcon />
                              </IconButton>
                            </Fab>
                    </Grid>
                </Grid>
                
            </Box>
            
            <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
                <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    paddingLeft: "31px", 
                    fontWeight:600, 
                    minWidth: column.minWidth,
                    backgroundColor: "white",
                    // color: '#000',
                    fontSize: '16px',
                    // borderBottom: "1px solid #1A2027",
                    }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                console.log('row000000---------->',row);
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}
                  style={{
                    height: "77px",
                    backgroundColor: "white",
                  }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{paddingLeft: "31px", fontSize: '15px'}}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        // style={{backgroundColor: '#d1c4e9'}}

      />
    </Paper>

            </Box>

        </div>
  );
}

