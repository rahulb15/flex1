import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect,useState } from 'react';
import axios from 'axios';

/////
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDataFlow } from '../../../context/DataFlowContext';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
const useStyles = makeStyles({
  content: {
    justifyContent: "center"
  }
});



const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function RedBar() {
  return (
    <Box
      sx={{
        height: 10,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? '#d1d9ff'
            : 'rgb(255 132 132 / 25%)',
      }}
    />
  );
}

const columns = [
  { id: 'live_url', label: 'Live Url', minWidth: 170 },
  { id: 'staging_url', label: 'Staging Url', minWidth: 170 },
  { id: 'user_login', label: 'User Login', minWidth: 170 },
  { id: 'user_password', label: 'User Password', minWidth: 170 },
  { id: 'admin_user_login', label: 'Admin Url', minWidth: 170 },
  { id: 'project_name', label: 'User Name', minWidth: 170 },
];

function createData(live_url, staging_url, user_login, user_password, project_name, admin_user_login) {
  return { live_url, staging_url, user_login, user_password, project_name, admin_user_login };
}

// const rows = [
//   createData('http://pollverse.com', 'http://www.flexsin.org/lab/pollverse', 'suraj_kumar@seologistics.com', 12345,'http://www.flexsin.org/lab/pollverse/admin','admin'),
//   createData('http://pollverse.com', 'http://www.flexsin.org/lab/pollverse', 'suraj_kumar@seologistics.com', 12345,'http://www.flexsin.org/lab/pollverse/admin','admin'),
//   createData('http://pollverse.com', 'http://www.flexsin.org/lab/pollverse', 'suraj_kumar@seologistics.com', 12345,'http://www.flexsin.org/lab/pollverse/admin','admin'),
//   createData('http://pollverse.com', 'http://www.flexsin.org/lab/pollverse', 'suraj_kumar@seologistics.com', 12345,'http://www.flexsin.org/lab/pollverse/admin','admin'),
//   createData('http://pollverse.com', 'http://www.flexsin.org/lab/pollverse', 'suraj_kumar@seologistics.com', 12345,'http://www.flexsin.org/lab/pollverse/admin','admin'),
//   createData('http://pollverse.com', 'http://www.flexsin.org/lab/pollverse', 'suraj_kumar@seologistics.com', 12345,'http://www.flexsin.org/lab/pollverse/admin','admin'),

// ];


export default function CheckboxesTags() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { siteMember, industry, technology, feature, portfolio } = useDataFlow();
  const [industryData, setIndustryData] = useState([]);
  const [technologyData, setTechnologyData] = useState([]);
  const [featureData, setFeatureData] = useState('');
  const [data, setData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  const [checkedFeature, setCheckedFeature] = useState("");


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const classes = useStyles();

  const onClick = () => {
    
    axios
      .post("http://localhost:3002/api/portfolio/search", {
        industry: industryData,
        technology: technologyData,
        feature: propertyData,
        feature_property_name: featureData,
        checkedFeature: checkedFeature

      })
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const rows = data.map((item) => {
    return createData(item.live_url, item.staging_url, item.user_login, item.user_password, item.project_name, item.admin_user_login);
  });

  const getFeatureProperty = () => {
    // const featureProperty = [];
    feature.filter((item) => {
      if (item.name === featureData) {
        // featureProperty.push(item.property_name);
        setPropertyData(item.property_name);
      }
    });
    // return featureProperty;
    // console.log("getData", feature.filter((item) => item.name === featureData));

  };

  console.log("propertyData", propertyData);
  console.log("featureData", featureData);

  //useEffect for getFeatureData to get property name
  useEffect(() => {
    getFeatureProperty();
  }, [featureData]);


  return (
    <div>
    <div style={{marginTop: 20}}>
      <div style={{ width: 900 }}>
      <RedBar/>
      </div>
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={industry}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        // console.log("optionSearch", option),
        // console.log("selected", selected),
        // console.log("props", props),
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      onChange={(event, value) => {
        // console.log("valueIndustry", value.map((item) => item.name));
        setIndustryData(value.map((item) => item.name));
      }}
      style={{ width: 900 }}
      renderInput={(params) => (
        <TextField {...params}  label="Industry" color="primary"  placeholder="Search By Industry" />
      )}
    />
    <div style={{marginTop: 30}}>
    <div style={{ width: 900 }}>
      <RedBar/>
      </div>
     <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={technology}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      onChange={(event, value) => {
        // console.log("valueTechnology", value);
        setTechnologyData(value.map((item) => item.name));
        
      }}
      style={{ width: 900 }}
      renderInput={(params) => (
        <TextField {...params} label="Technology" color="primary"  placeholder="Search By Technology" />
      )}
    />
    </div>
    <div style={{marginTop: 30}}>
    <div style={{ width: 900 }}>
      <RedBar/>
      </div>

     
          <RadioGroup 
          row
            aria-label="feature"
            name="feature"
            onChange={(event, value) => {
              console.log("valueFeature", value);
              setFeatureData(value);
              setCheckedFeature(event.target.value);
            }}
            style={{ width: 900, marginTop: 20, marginBottom: 20, marginLeft: 20, marginRight: 20 }}
          >
            {feature.map((item) => (
              <FormControlLabel
              style={{marginRight: 10, marginLeft: 10, marginTop: 10, marginBottom: 10}}
                value={item.name}
                control={<Radio />}
                label={item.name}
              />
            ))}
          </RadioGroup>
          <div style={{ width: 900 }}>
      <RedBar/>
      </div>















     <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      // options={feature.filter((item) => item.name === featureData)}
      options={propertyData}
      // options={feature}
      disableCloseOnSelect
      icon={KeyboardDoubleArrowRightIcon}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        console.log("optionSearch", option),
        console.log("selected", selected),
        console.log("props", props),
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      onChange={(event, value) => {
        // console.log("valueFeature", value);
        setFeatureData(value.map((item) => item.name));
      }}
      style={{ width: 900 }}
      renderInput={(params) => (
        <TextField {...params} label="Feature" color="primary" placeholder="Search By Feature" />
      )}
    />
    <div style={{marginTop: 30}}>
    <Button variant="contained" endIcon={<SearchIcon />} onClick={onClick}>
        Search
      </Button>
    </div>
    </div>
    </div>
    <div style={{marginTop: 30}}>
    <Paper sx={{ width: '100%', overflow: 'hidden', borderColor: 'red'}}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight: 1000}}
                  // style={{ minWidth: column.minWidth, fontWeight: 1000,backgroundColor: '#d1c4e9'}}
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
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{ 
                        padding: 20, 
                        // backgroundColor: '#f3e5f5', 
                        }}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // style={{backgroundColor: '#d1c4e9'}}
      />
    </Paper>
    </div>
    </div>
  );
}