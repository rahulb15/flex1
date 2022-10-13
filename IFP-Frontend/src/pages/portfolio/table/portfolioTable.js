import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import AddDialog from "../formDialog/AddDialog";
import EditDialog from "../formDialog/EditDialog";
import DeleteDialog from "../formDialog/DeleteDialog";
import { useDataFlow } from "../../../context/DataFlowContext";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Close from '@mui/icons-material/Close';
import {useEffect, useState} from "react";



function createData(project_name,live_url,staging_url,user_login,user_password,staging_admin_url,admin_user_login,admin_password,technology,industry,feature,id ) {
  return { project_name,live_url,staging_url,user_login,user_password,staging_admin_url,admin_user_login,admin_password,technology,industry,feature,id };
}

// const rows = [
//   createData('Cupcake', 305, 3.7, 67, 4.3),
 
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'project_name',
    numeric: false,
    disablePadding: true,
    label: 'Title',
  },
  {
    id: 'live_url',
    numeric: true,
    disablePadding: false,
    label: 'Domain Name	',
  },
  {
    id: 'staging_url',
    numeric: true,
    disablePadding: false,
    label: 'Staging Url',
  },
  {
    id: 'industry',
    numeric: true,
    disablePadding: false,
    label: 'Industry',
  },
  {
    id: 'technology',
    numeric: true,
    disablePadding: false,
    label: 'Technology',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={{ color: '#37474f', '&:hover': { color: '#b71c1c' },
                fontWeight: 'bold',
                fontSize: '17px',
                lineHeight: '16px',
                letterSpacing: '0.25px',
                // fontFamily: 'Roboto',
                // fontStyle: 'normal',
                }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="right"><AddDialog/></TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  console.log("props",props)
  const { numSelected } = props.numSelected;
  // const [query, setQuery] = React.useState('');
  // console.log("query",query);

  //material ui box setOpen close function 
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


 

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
     {/* <Box sx={{flexGrow: 1}}> */}
     <Box
     open={open}
      sx={{
        // width: 1000,
        maxWidth: '100%',
        border: 'none',
        borderRadius: 1,
        boxShadow: 1,
        bgcolor: 'background.paper',
        '& > :not(style)': { m: 1, width: '55ch' },

      }}
    >
      
      <TextField
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Close />
            </InputAdornment>
          ),
        }}
        variant="outlined"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
      />
    </Box>
        
        <div className="d-flex justify-content-end w-100">
          <IconButton>
            <Tooltip title="Search">
              <SearchIcon onClick={handleClickOpen} />
            </Tooltip>
          </IconButton>
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
        </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { siteMember, industry, technology, feature, portfolio } = useDataFlow();
  const[portfolioData,setPortfolioData] = useState(portfolio);
  const [query, setQuery] = React.useState('');
  console.log("query",query);

 
const rows = portfolioData.map((item) => {
        return createData(item.project_name,item.live_url,item.staging_url,item.user_login,item.user_password,item.staging_admin_url,item.admin_user_login,item.admin_password,item.technology,item.industry,item.feature,item.id);
    });
//update table data after edit or delete operation
  useEffect(() => {
    setPortfolioData(portfolio);
  }, [portfolio]);



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

 

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const getPortfolio = () => {
        const rows = portfolio.map((item) => {
          return createData(item.project_name,item.live_url,item.staging_url,item.user_login,item.user_password,item.staging_admin_url,item.admin_user_login,item.admin_password,item.technology,item.industry,item.feature,item.id);
        });
        return rows;
    }




  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar query={query} setQuery={setQuery} numSelected={selected} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750, marginTop: 2, marginBottom: 2, marginLeft: 4, marginRight: 2 }}
            aria-labelledby="tableTitle"
            size={'large'}
            >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody
            style={{ height: 400, overflow: 'auto' }}
            >
    
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((row) => {
                    if (query === "") {
                        return row;
                    } else if (
                        row.project_name.toLowerCase().includes(query.toLowerCase()) ||
                        row.live_url.toLowerCase().includes(query.toLowerCase()) ||
                        row.staging_url.toLowerCase().includes(query.toLowerCase()) ||
                        // row.user_login.toLowerCase().includes(query.toLowerCase()) ||
                        // row.user_password.toLowerCase().includes(query.toLowerCase()) ||
                        // row.staging_admin_url.toLowerCase().includes(query.toLowerCase()) ||
                        // row.admin_user_login.toLowerCase().includes(query.toLowerCase()) ||
                        // row.admin_password.toLowerCase().includes(query.toLowerCase()) ||
                        row.technology.toLowerCase().includes(query.toLowerCase()) ||
                        row.industry.toLowerCase().includes(query.toLowerCase())
                        // row.feature.toLowerCase().includes(query.toLowerCase())
                    ) {
                        return row;
                    }
                })
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.id)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      // tabIndex={-1}
                      // key={row.project_name}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      <TableCell
                      align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.project_name}
                      </TableCell>
                      <TableCell align="left">{row.live_url}</TableCell>
                      <TableCell align="left">{row.staging_url}</TableCell>
                      <TableCell align="left">{row.industry}</TableCell>
                      <TableCell align="left">{row.technology}</TableCell>
                      <TableCell align="left">{""}</TableCell>
                      <TableCell align="left">
                        <div className="d-flex justify-content-end">
                          <EditDialog
                            id={row.id}
                            project_name={row.project_name}
                            live_url={row.live_url}
                            staging_url={row.staging_url}
                            user_login={row.user_login}
                            user_password={row.user_password}
                            staging_admin_url={row.staging_admin_url} 
                            admin_user_login={row.admin_user_login}
                            admin_password={row.admin_password}
                            technology={row.technology}
                            industry={row.industry}
                            feature={row.feature}
                          />
                          <DeleteDialog
                            id={row.id}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
