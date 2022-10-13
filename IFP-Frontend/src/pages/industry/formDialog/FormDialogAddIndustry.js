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

const FormDialogAddIndustry = (props) => {
  const [open, setOpen] = useState(false);
  const [industry, setIndustry] = useState(initialFormState);
  const [errors, setErrors ] = useState({})

  console.log("industry", props.industryData);

  const handleClickOpen = () => {
      setErrors({});
      setIndustry(initialFormState);
      setOpen(true);
  }

  const handleClose = () => {
      setOpen(false);
  }

  const handleInputChange = event => {
		const { name, value } = event.target
    setIndustry({ ...industry, [name]: value })
  }
  
  const validate = () => {
      let tempErrors = {};
      let formIsValid = true;

      if(!industry.name || industry.name.trim() ===  ""){
        formIsValid = false;
        tempErrors["name"] = "Cannot be empty";
      }

      // if(!industry.email || industry.email.trim() ===  ""){
      //   formIsValid = false;
      //   tempErrors["email"] = "Cannot be empty";
      // }

      // let regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      // if (!regexp.test(industry.email)) {
      //   formIsValid = false;
      //   tempErrors["email"] = "Email is not valid";
      // }

      // if(!industry.password || industry.password.trim() ===  ""){
      //   formIsValid = false;
      //   tempErrors["password"] = "Cannot be empty";
      // }

      // if(props.industryData((item) => item.name === industry.name)){
      //   formIsValid = false;
      //   tempErrors["name"] = "Industry already exists";
      // }
      props.industryData.map((item) => {
        if(item.name === industry.name.trim()){
          formIsValid = false;
          tempErrors["name"] = "Industry already exists";
        }
      })


      setErrors(tempErrors);
      return formIsValid;



  }

  const handleSubmit = (e) => {
      const onSuccess = () => {
          props.refresh()
          setOpen(false);
          toast.success('Industry added successfully');
      }
      e.preventDefault();

      if(validate()){
        props.create(industry, onSuccess)
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
            <DialogTitle id="form-dialog-title" style={{padding: "30px 30px 0px 30px"}}>Add Industry</DialogTitle>

            <DialogContent style={{padding: "30px 30px 10px 30px"}}>
           
  

                <br /><br />

                <TextField
                  autoFocus
                  name="name"
                  label="Name"
                  value={industry.name}
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

export default FormDialogAddIndustry;