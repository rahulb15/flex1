import jwt from '../middleware/auth';
import { Router } from "express";
const industryRouter = Router();
const industryController = require('../controllers/industry.controller.js');

// Retrieve All data
industryRouter.get('/list', jwt, industryController.findAll);

// Retrieve data with pagination
industryRouter.get('/', jwt, industryController.findPagination);

// Find one by ID
// industryRouter.get('/:id', jwt, industryController.findOne);

// Create
industryRouter.post('/', jwt, industryController.create);

// Update
industryRouter.put('/:id', jwt, industryController.update);

// Delete
industryRouter.delete('/:id', jwt, industryController.delete);

industryRouter.get('/count', jwt, industryController.count);



export default industryRouter;
