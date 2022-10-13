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

const FormDialogAddTechnology = (props) => {
  const [open, setOpen] = useState(false);
  const [technology, setTechnology] = useState(initialFormState);
  const [errors, setErrors ] = useState({})

  console.log("technology", props.technologyData);

  const handleClickOpen = () => {
      setErrors({});
      setTechnology(initialFormState);
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleInputChange = event => {
		const { name, value } = event.target
    setTechnology({ ...technology, [name]: value })
  }
  
  const validate = () => {
      let tempErrors = {};
      let formIsValid = true;

      if(!technology.name || technology.name.trim() ===  ""){
        formIsValid = false;
        tempErrors["name"] = "Cannot be empty";
      }

      // if(!technology.email || technology.email.trim() ===  ""){
      //   formIsValid = false;
      //   tempErrors["email"] = "Cannot be empty";
      // }

      // let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // if (!regexp.test(technology.email)) {
      //   formIsValid = false;
      //   tempErrors["email"] = "Email is not valid";
      // }

      // if(!technology.password || technology.password.trim() ===  ""){
      //   formIsValid = false;
      //   tempErrors["password"] = "Cannot be empty";
      // }

      {props.technologyData.map((technology) => {
        if(technology.name === technology.name.trim()){
          formIsValid = false;
          tempErrors["name"] = "Technology already exists";
        } 
      }
      )}

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
        props.create(technology, onSuccess)
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
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>Add Technology</DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
           
  

                <br /><br />

                <TextField
                  autoFocus
                  name="name"
                  label="Name"
                  value={technology.name}
                  fullWidth
                  onChange={handleInputChange}
                  {...(errors.name && { error: true, helperText: errors.name })}
                />

                <br /><br />

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

export default FormDialogAddTechnology;