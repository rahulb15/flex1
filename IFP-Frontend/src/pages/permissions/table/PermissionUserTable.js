import React, { useEffect, useState } from "react";
import { Paper, withStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import * as actions from "../../../actions/user";
import { useHistory } from 'react-router-dom';
import Checkbox from '../../permissions/table/Checkboxhandle'

const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
    }
})

const UserTable = ({ classes, ...props }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [addCheck, setAddCheck] = useState(false)
    const [viewCheck, setViewCheck] = useState(false)
    const [updateCheck, setUpdateCheck] = useState(false)
    const [deleteCheck,setDeleteCheck] = useState(false)
   
    const history = useHistory();
    

    useEffect(() => {
        props.fetchPagination(1, rowsPerPage)
    }, []
    
    )

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
                filter: true,
                sort: true,
            }
        },
        {
            // left side of first column is too close with the container, give more space on it
            name: "name",
            label: "User",
            options: {
                filter: true,
                sort: false,
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} 
                            style={{
                                paddingLeft: "31px", 
                                fontWeight:500, 
                                borderBottom: "1px solid rgba(224, 224, 224, .5)" 
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
            }
        },
        {
            name: "",
            label: "Permissions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                   
                    return (
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>

                               <Checkbox
                                dataUser={tableMeta.rowData}
                                update={props.update}
                            />
                       
                 
                        </div>
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
                customHeadRender: (columnMeta, handleToggleColumn) => {
                    return (
                        <th key={columnMeta.index} style={{paddingRight: "16px"}}>
                            
                        </th>
                    );
                },
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        
                        <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                           
                        
                                            
                            {/* <FormDialogEditUser
                                dataUser={tableMeta.rowData}
                                update={props.update}
                            />
                            <FormDialogDeleteUser 
                                dataUser={tableMeta.rowData}
                                delete={props.delete}
                                refresh={refresh}
                            /> */}
                            
                        </div>
                    );
                }
            }
        }
    ];

    const handleRowClick = (rowData) => {

         console.log("rawdataaaaaaa",rowData);
      
       history.push({pathname:'/admin/permission/managepermission',state : rowData});
    };
     
    const options = {
        filterType: 'textField',
        responsive: 'stacked',
        selectableRows: false,
        rowsPerPageOptions: [5, 10, 25],
        serverSide: true,
        viewColumns: true,
        print: false,
        download: false,
        onRowClick: handleRowClick,
        rowsPerPage: rowsPerPage,
        count: props.meta.totalDocs || 0,
        page: page,
       // selectableRows: true,

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
    // create: actions.create,
    // update: actions.update,
    // delete: actions.Delete,
    add_permission: actions.add_permission,
    view_permission: actions.view_permission,
    update_permission: actions.update_permission,
    delete_permission: actions.delete_permission
    
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(UserTable));