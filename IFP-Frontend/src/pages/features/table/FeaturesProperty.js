import React,{useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EnhancedTable from './FeaturesPropertyTable';


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));


export default function ControlledOpenSelect() {
    const [features, setFeatures] = React.useState('');
    const [select, setSelect] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [dataTable, setDataTable] = React.useState([]);

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
            setDataTable(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);
    console.log(select);
    console.log(features);


    return (
        <div>
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
                                    {dataTable.map((item) => (
                                        <MenuItem value={item.name}>{item.name}</MenuItem>
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
                            <Fab color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                    </Grid>
                </Grid>
                
            </Box>
            
            <Box sx={{ flexGrow: 1, marginTop: '20px' }}>
            <EnhancedTable />
            </Box>

        </div>
    );
}