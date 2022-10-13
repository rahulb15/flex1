import React, { useEffect, useState } from "react";
import { Paper, withStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import * as actions from "../../../actions/user";
import FormDialogAddUser from "../formDialog/FormDialogAddUser";
import FormDialogEditUser from "../formDialog/FormDialogEditUser";
import FormDialogDeleteUser from "../formDialog/FormDialogDeleteUser";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import CustomizedDialogs from '../formDialog/TransferPermissionDialog'

const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
        
    },
})


const UserTable = ({ classes, ...props }) => {
    console.log("UserTable props", props);
    
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });
      
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };

      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      const handlePasswordChange = (prop) => (event) => {
        console.log("handlePasswordChange");
        setValues({ ...values, [prop]: event.target.value });
      };

    useEffect(() => {
        props.fetchPagination(1, rowsPerPage)
    }, [])

    const handleChangePage = async (newPage) => {
        await setPage(newPage);
        props.fetchPagination(newPage + 1, rowsPerPage)
    };

    const handleChangeRowsPerPage = async (rowsPerPage) => {
        await setRowsPerPage(rowsPerPage);
        await setPage(0);
        props.fetchPagination(1, rowsPerPage)
    };

    const handleSearch = async (searchText) => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage, searchText, searchText)
    };

    const handleFilterChange = async (name, email) => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage, name, email)
    };

    const refresh = async () => {
        await setPage(0);
        props.fetchPagination(1, rowsPerPage)
    }
    
    const columns = [
        {
            name: "id",
            label: "ID",
            options: {
                display: false,
                filter: false,
                sort: false,
            }
        },
        {
            // left side of first column is too close with the container, give more space on it
            name: "name",
            label: "Name",
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} 
                            style={{
                                paddingLeft: "31px", 
                                fontWeight:800, 
                                borderBottom: "1px solid rgba(224, 224, 224, .5)" ,
                                }}
                        >
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                                {columnMeta.label}
                            </div>
                        </th>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <span style={{marginLeft:15}}>
                            {value}
                        </span>
                    );
                }
            },
            
        },
        {
            name: "email",
            label: "Email",
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} 
                            style={{
                                paddingLeft: "31px", 
                                fontWeight:800, 
                                borderBottom: "1px solid rgba(224, 224, 224, .5)" ,
                                }}
                        >
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                                {columnMeta.label}
                            </div>
                        </th>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <span style={{marginLeft:15}}>
                            {value}
                        </span>
                    );
                }
            },
        },
        {
            name: "register_date",
            label: "Register Date",
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} 
                            style={{
                                paddingLeft: "31px", 
                                fontWeight:800, 
                                borderBottom: "1px solid rgba(224, 224, 224, .5)",
                                }}
                        >
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                                {columnMeta.label}
                            </div>
                        </th>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <span style={{marginLeft:15}}>
                            {value}
                        </span>
                    );
                }
            },
        },
        {
            name: "role",
            label: "Role",
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} 
                            style={{
                                paddingLeft: "31px", 
                                fontWeight:800, 
                                borderBottom: "1px solid rgba(224, 224, 224, .5)",
                                }}
                        >
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                                {columnMeta.label}
                            </div>
                        </th>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <span style={{marginLeft:15}}>
                            {value}
                        </span>
                    );
                }
            },
        },
        {
            name: "password",
            label: "Password",
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} 
                            style={{
                                paddingLeft: "31px", 
                                fontWeight:800, 
                                borderBottom: "1px solid rgba(224, 224, 224, .5)",
                                }}
                        >
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                                {columnMeta.label}
                            </div>
                        </th>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    console.log("passValue", value)
                    console.log("passTableMeta", tableMeta)
                    console.log("passUpdateValue", updateValue)
                    return (
                        <span style={{marginLeft:15}}>
                            <Input
                                id="standard-adornment-password"
                                style={{border:"none", backgroundColor:"transparent", width:200}}
                                disableUnderline={true}
                                type={values.showPassword ? 'text' : 'password'}
                                value={value}
                                onChange={handlePasswordChange("password")}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                            />                            


                            
                        </span>
                    );
                }
            },
        },
        {
            name: "",
            options: {
                filter: false,
                sort: false,
                empty: true,
            
                customHeadRender: (columnMeta, handleToggleColumn) => {
                   
                    return (
                        <th key={columnMeta.index} style={{paddingRight: "16px"}}>
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                                <FormDialogAddUser component={Paper}  
                                    create={props.create}
                                    refresh={refresh}
                                />
                            </div>
                        </th>
                    );
                }
            }
         },
            
            
            {
                name: "",
             options: {
                filter: false,
                sort: false,
                empty: true,
                // display: add_permission,
                customBodyRender: (value, tableMeta, updateValue) => {
                    console.log("tableMeta",tableMeta)
                    return (
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                                <CustomizedDialogs component={Paper}
                                    id={tableMeta.rowData[0]}
                                    delete={props.delete}
                                    refresh={refresh}
                                />
                            <FormDialogEditUser
                                dataUser={tableMeta.rowData}
                                update={props.update}
                            />
                            <FormDialogDeleteUser 
                                dataUser={tableMeta.rowData}
                                delete={props.delete}
                                refresh={refresh}
                            />
                        </div>
                    );
                }

            },
            
        }
        
    ];

    const options = {
        filterType: 'textField',
        responsive: 'stacked',
        selectableRows: false,
        rowsPerPageOptions: [5, 10, 25],
        serverSide: true,
        viewColumns: false,
        print: false,
        download: false,

        rowsPerPage: rowsPerPage,
        count: props.meta.totalDocs || 0,
        page: page,

        onTableChange: (action, tableState) => {
            switch (action) {
              case 'changePage':
                handleChangePage(tableState.page)
                break;

            case 'changeRowsPerPage':
                handleChangeRowsPerPage(tableState.rowsPerPage)
                break;

            case 'search':
                handleSearch(tableState.searchText)
                break;

            case 'filterChange':
                handleFilterChange(tableState.filterList[1], tableState.filterList[2])
                break;
            
            case 'resetFilters':
                handleSearch("")
                break;
                 
              default:
                break;
            }
        },
    };
    
    return (
        <MUIDataTable className={classes.paperTable}
            data={props.users}
            columns={columns}
            options={options}
        />
    );
}

const mapStateToProps = state => ({
    users: state.user.users,
    meta: state.user.metaUser
})

const mapActionToProps = {
    fetchPagination: actions.Pagination,
    create: actions.create,
    update: actions.update,
    delete: actions.Delete,
    add_permission: actions.add_permission,
    

}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserTable));