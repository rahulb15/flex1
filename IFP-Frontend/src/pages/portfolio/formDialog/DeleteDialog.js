import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDataFlow } from "../../../context/DataFlowContext";






export default function FormDialog(props) {
    console.log(props);
    const [open, setOpen] = React.useState(false);
    const {
        siteMember,
        industry,
        technology,
        feature,
        portfolio,
        setPortfolioData,
      } = useDataFlow();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleDelete = () => {
        console.log(props.id);
        axios.delete(`http://localhost:3002/api/portfolio/${props.id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {
            setPortfolioData();
            console.log(res);
            toast.success('Portfolio deleted successfully');
        })
        .catch((err) => {
            console.log(err);
            toast.error('Error deleting portfolio');
        })
        setOpen(false);
    }


    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen} style={{color: 'red'}}>
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Are you sure you want to delete this item?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete}>Delete</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
