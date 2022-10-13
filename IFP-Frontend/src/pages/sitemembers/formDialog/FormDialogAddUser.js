import React, { useState } from "react";
import {Button,TextField, InputLabel ,Select ,MenuItem} from "@material-ui/core";
// import { InputLabel } from '@mui/material';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { toast } from 'react-toastify';
import Grow from '@material-ui/core/Grow';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} {...props} />;
});

const initialFormState = { 
	id: null, 
  role: "",
	name: "",
  email: "",
  password: ""
}

const FormDialogAddUser = (props) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors ] = useState({})

  const handleClickOpen = () => {
      setErrors({});
      setUser(initialFormState);
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleInputChange = event => {
		const { name, value } = event.target
    setUser({ ...user, [name]: value })
  }
  
  const validate = () => {
      let tempErrors = {};
      let formIsValid = true;

      if(!user.role || user.role.trim() ===  ""){
        formIsValid = false;
        tempErrors["role"] = "Cannot be empty";
      }

      if(!user.name || user.name.trim() ===  ""){
        formIsValid = false;
        tempErrors["name"] = "Cannot be empty";
      }

      if(!user.email || user.email.trim() ===  ""){
        formIsValid = false;
        tempErrors["email"] = "Cannot be empty";
      }

      let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regexp.test(user.email)) {
        formIsValid = false;
        tempErrors["email"] = "Email is not valid";
      }

      var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/);
      if (!pattern.test(user.password)) {
        formIsValid = false;
        tempErrors["password"] = "Password is not valid";
        toast.error("Password must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters");
      }

      // if(!user.password || user.password.trim() ===  ""){
      //   formIsValid = false;
      //   tempErrors["password"] = "Cannot be empty";
      // }

      setErrors(tempErrors);
      return formIsValid;
  }

  const handleSubmit = (e) => {
      const onSuccess = () => {
          props.refresh()
          setOpen(false);
          toast.success('Data succesfully updated');
      }
      e.preventDefault();

      if(validate()){
        props.create(user, onSuccess)
      }
  }

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen} >
          <AddCircleIcon style={{ fontSize: "40px" }} />
      </IconButton>
      <Dialog  
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="form-dialog-title"
      >
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>Add User</DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
           
  <InputLabel >Role</InputLabel>
  <Select
    autoFocus
    name="role"
    fullWidth
    value={user.role}
    label="role"
    onChange={handleInputChange}
  >
    <MenuItem value={"user"}>User</MenuItem>
    <MenuItem value={"admin"}>Admin</MenuItem>
  </Select>

                <br /><br />

                <TextField
                  autoFocus
                  name="name"
                  label="Name"
                  value={user.name}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.name && { error: true, helperText: errors.name })}
                />

                <br /><br />

                <TextField
                  name="email"
                  label="Email"
                  value={user.email}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.email && { error: true, helperText: errors.email })}
                />

                <br /><br />

                <TextField
                  name="password"
                  label="Password"
                  value={user.password}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.password && { error: true, helperText: errors.password })}
                />
                <br /><br />
                <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Permission</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel value="add_user" control={<Radio />} label="Add User" />
        <FormControlLabel value="update_user" control={<Radio />} label="Update User" />
        <FormControlLabel value="delete_user" control={<Radio />} label="Delete User" />

      </RadioGroup>
    </FormControl>

            </DialogContent>

            <DialogActions style={{padding: 30}}>
                <Button variant="contained" onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} color="secondary">
                    Save
                </Button>
            </DialogActions>

      </Dialog>
    </div>
  );
}

export default FormDialogAddUser;