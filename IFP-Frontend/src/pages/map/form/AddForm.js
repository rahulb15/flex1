import React, { useState } from 'react'
import { TextField, withStyles, Button, MenuItem, Paper, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import * as actions from "../../../actions/map";
import PageTitle from "../../../components/PageTitle/PageTitle";
import '../style.css';

const styles = theme => ({
	paper: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(3)
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
		justifyContent: 'center',
    },
    postBtn: {
        width: "200px",
        marginTop: "30px",
        marginBottom: "20px"
    }
})

const initialFormState = { 
	id: null, 
	name: "",
	  category: "",
	description: "",
	address: "",
	city: "",
	coordinate: {
		lat: 0,
		lng: 0
	},
	facilities: [],
	images : []
}

const AddForm = ({ classes, ...props }) => {
	const [ map, setMap ] = useState(initialFormState)
	const [ errors, setErrors ] = useState({})
	
	const handleInputChange = event => {
		const { name, value } = event.target

		if(name === "lat" || name === "lng")  {
			setMap({ 
				...map, coordinate:{...map.coordinate, [name]:value}
			})
		}
		else {
			setMap({ ...map, [name]: value })
		}
	}

	const validate = () => {
        let tempErrors = {};
        let formIsValid = true;

        if(!map.name || map.name.trim() ===  ""){
			formIsValid = false;
			tempErrors["name"] = "Cannot be empty";
		}
	
		if(!map.category){
			formIsValid = false;
			tempErrors["category"] = "Not selected yet";
		}
	
		if(!map.description || map.description.trim() ===  ""){
			formIsValid = false;
			tempErrors["description"] = "Cannot be empty";
		}
	
		if(!map.address || map.address.trim() ===  ""){
			formIsValid = false;
			tempErrors["address"] = "Cannot be empty";
		}

		if(!map.coordinate.lat || parseInt(map.coordinate.lat) === 0) {
			formIsValid = false;
			tempErrors["lat"] = "Cannot be zero or empty ";
		}

		if(!map.coordinate.lng || parseInt(map.coordinate.lng) === 0) {
			formIsValid = false;
			tempErrors["lng"] = "Cannot be zero or empty";
		}

		if (Array.isArray(map.facilities)) {
			if (map.facilities.length === 0) {
				formIsValid = false;
				tempErrors["facilities"] = "Input not valid";
			}
			else {
				// eslint-disable-next-line
				for (const [index, facility] of map.facilities.entries()) {
					if (facility.trim() === "") {
						formIsValid = false;
						tempErrors["facilities"] = "Input not valid";
						break;
					}
				}
			}
		}
		else {
			if (map.facilities.trim() ===  "") {
				formIsValid = false;
				tempErrors["facilities"] = "Cannot be empty";
			}
			else {
				let arr = map.facilities.split(",")
				// eslint-disable-next-line
				for (const [index, facility] of arr.entries()) {
					if (facility.trim() === "") {
						formIsValid = false;
						tempErrors["facilities"] = "Input not valid";
						break;
					}
				}
			}
		}
			
		if (Array.isArray(map.images)) {
			if (map.images.length === 0) {
				formIsValid = false;
				tempErrors["images"] = "Input not valid";
			}
			else {
				// eslint-disable-next-line
				for (const [index, image] of map.images.entries()) {
					if (image.trim() === "") {
						formIsValid = false;
						tempErrors["images"] = "Input not valid";
						break;
					}
				}
			}
		}
		else {
			if (map.images.trim() ===  "") {
				formIsValid = false;
				tempErrors["images"] = "Cannot be empty";
			}
			else {
				let arr = map.images.split(",")
				// eslint-disable-next-line
				for (const [index, image] of arr.entries()) {
					if (image.trim() === "") {
						formIsValid = false;
						tempErrors["images"] = "Input not valid";
						break;
					}
				}
			}
		}
      
		setErrors(tempErrors);
		return formIsValid;
    }
	
	const handleSubmit = (e) => {
		const onSuccess = () => {
			props.history.push("/admin/map")
			toast.success('Data succesfully created');
		}
        e.preventDefault();

        if(validate()){
			props.create(map, onSuccess)
        }
    }

	return (
		<React.Fragment>
            <PageTitle title="Add Map" />
            <Grid container spacing={4} >

				<Paper className={classes.paper}>

				<form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`}
					onSubmit={handleSubmit} component={Paper} >

					<TextField
						name="name"
						variant="outlined"
						label="Name"
						fullWidth
						value={map.name}
						onChange={handleInputChange}
						{...(errors.name && { error: true, helperText: errors.name })}
					/>
					<TextField 
						select
						name="category"
						label="Category" 
						value={map.category}
						variant="outlined"
						fullWidth
						onChange={handleInputChange}
						{...(errors.category && { error: true, helperText: errors.category })}
						>
						<MenuItem value={"apartment"}>Apartment</MenuItem>
						<MenuItem value={"office"}>Office</MenuItem>
					</TextField>
					<TextField
						name="description"
						variant="outlined"
						label="Description"
						fullWidth
						multiline
						rows={5}
						value={map.description}
						onChange={handleInputChange}
						{...(errors.description && { error: true, helperText: errors.description })}
					/>
					<TextField
						name="address"
						variant="outlined"
						label="Address"
						fullWidth
						multiline
						rows={3}
						value={map.address}
						onChange={handleInputChange}
						{...(errors.address && { error: true, helperText: errors.address })}
					/>
					<TextField
						name="city"
						variant="outlined"
						label="City"
						fullWidth
						value={map.city}
						onChange={handleInputChange}
						{...(errors.city && { error: true, helperText: errors.city })}
					/>
					<TextField
						name="lat"
						variant="outlined"
						label="Latitude"
						fullWidth
						value={map.coordinate.lat || 0}
						onChange={handleInputChange}
						{...(errors.lat && { error: true, helperText: errors.lat })}
					/>
					<TextField
						name="lng"
						variant="outlined"
						label="Longitude"
						fullWidth
						value={map.coordinate.lng || 0}
						onChange={handleInputChange}
						{...(errors.lng && { error: true, helperText: errors.lng })}
					/>
					<TextField
						name="facilities"
						variant="outlined"
						label="Facilities"
						placeholder="Separated by comma, ex: item1, item2, etc"
						fullWidth
						multiline
						rows={5}
						value={map.facilities}
						onChange={handleInputChange}
						{...(errors.facilities && { error: true, helperText: errors.facilities })}
					/>
					<TextField
						name="images"
						variant="outlined"
						label="Images"
						placeholder="Separated by comma, ex: /path/img1.jpg, /path/img2.png, etc"
						fullWidth
						multiline
						rows={5}
						value={map.images}
						onChange={handleInputChange}
						{...(errors.images && { error: true, helperText: errors.images })}
					/>
					<div className="form-button-container">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={() => props.history.push("/map")}
						>Cancel</Button>

						<Button
							variant="contained"
							color="secondary"
							size="large"
							type="submit"
						>Save</Button>
					</div>
				</form>

				</Paper>
			</Grid>
		</React.Fragment>
    );
}

const mapActionToProps = {
    create: actions.create,
    update: actions.update
}

export default connect(null, mapActionToProps)(withStyles(styles)(AddForm));
