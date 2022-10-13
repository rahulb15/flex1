import jwt from '../middleware/auth';
import { Router } from "express";
const technologyRouter = Router();
const technologyController = require('../controllers/technology.controller.js');

// Retrieve All data
technologyRouter.get('/list', jwt, technologyController.findAll);

// Retrieve data with pagination
technologyRouter.get('/', jwt, technologyController.findPagination);

// Find one by ID
// technologyRouter.get('/:id', jwt, technologyController.findOne);

// Create
technologyRouter.post('/', jwt, technologyController.create);

// Update
technologyRouter.put('/:id', jwt, technologyController.update);

// Delete
technologyRouter.delete('/:id', jwt, technologyController.delete);

technologyRouter.get('/count', jwt, technologyController.count);





export default technologyRouter;
