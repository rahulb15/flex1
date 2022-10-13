import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState({
    email: '',
  }
  );


 const handleChange = (event) => {
    setEmail({ ...email, [event.target.name]: event.target.value });
  };




  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitEmail", email);
    axios
      .post("http://localhost:3002/api/user/emailSend", email)
      .then((res) => {
        handleClose();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

console.log(email);
  return (
    <div>
      <Button color="primary" size="large"  onClick={handleClickOpen}>
        Forget Password
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Forget Password"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your registered email address and we will send you a link to reset your password.
          </DialogContentText>
            <TextField     
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                name="email"
                value={email.email}
                onChange={handleChange}
            />
            {message}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
