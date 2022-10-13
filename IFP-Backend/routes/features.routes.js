import jwt from '../middleware/auth';
import { Router } from "express";
const featuresRouter = Router();
const featuresController = require('../controllers/features.controller.js');

// Retrieve All data
featuresRouter.get('/list', jwt, featuresController.findAll);

// Retrieve data with pagination
featuresRouter.get('/', jwt, featuresController.findPagination);

// Find one by ID
// featuresRouter.get('/:id', jwt, featuresController.findOne);

featuresRouter.get('/getAllProperties', jwt, featuresController.getAllPropertyName);


// Create
featuresRouter.post('/', jwt, featuresController.create);

// Update
featuresRouter.put('/:id', jwt, featuresController.update);

// Delete
featuresRouter.delete('/:id', jwt, featuresController.delete);

//update properties
featuresRouter.post('/createProperty/:id', jwt, featuresController.createPropertyName);

//populate properties
featuresRouter.get('/populateProperty/:id', jwt, featuresController.populatePropertyName);

featuresRouter.get('/count', jwt, featuresController.count);

//update properties
// featuresRouter.put('/updateProperty/:id', jwt, featuresController.updatePropertyName);

//get all properties


export default featuresRouter;
