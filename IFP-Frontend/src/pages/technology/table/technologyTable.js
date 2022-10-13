import React, { useEffect, useState } from "react";
import { Paper, withStyles } from '@material-ui/core';
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import * as actions from "../../../actions/technology";
import FormDialogAddTechnology from "../formDialog/FormDialogAddTechnology";
import FormDialogEditTechnology from "../formDialog/FormDialogEditTechnology";
import FormDialogDeleteTechnology from "../formDialog/FormDialogDeleteTechnology";
import { BlockRounded, DonutLarge, FormatBold } from "@material-ui/icons";

const styles = theme => ({
    paperTable: {
        padding: theme.spacing(0),
    }
})

const TechnologyTable = ({ classes, ...props }) => {
    
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

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
                                fontWeight:600, 
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
                                fontWeight:600, 
                                borderBottom: "1px solid rgba(224, 224, 224, .5)" 
                                }}
                        >
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
                                {columnMeta.label}
                            </div>
                        </th>
                    );
                },
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
                            <div style={{display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                                <FormDialogAddTechnology component={Paper}  
                                    create={props.create}
                                    refresh={refresh}
                                    technologyData={props.technologys}
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
                            <FormDialogEditTechnology
                                dataTechnology={tableMeta.rowData}
                                update={props.update}
                            />
                            <FormDialogDeleteTechnology 
                                dataTechnology={tableMeta.rowData}
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
            data={props.technologys}
            columns={columns}
            options={options}
        />
    );
}

const mapStateToProps = state => ({
    technologys: state.technology.technologys,
    meta: state.technology.metaTechnology
})

const mapActionToProps = {
    fetchPagination: actions.Pagination,
    create: actions.create,
    update: actions.update,
    delete: actions.Delete,
   
    

}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(TechnologyTable));