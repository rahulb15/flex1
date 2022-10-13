import jwt from '../middleware/auth';
import { Router } from "express";
import Portfolio from '../models/portfolio.model';
const portfolioRouter = Router();
const portfolioController = require('../controllers/portfolio.controller.js');

// Retrieve All data
portfolioRouter.get('/list', jwt, portfolioController.findAll);

// Retrieve data with pagination
portfolioRouter.get('/', jwt, portfolioController.findPagination);

// Find one by ID
// portfolioRouter.get('/:id', jwt, portfolioController.findOne);

// Create
portfolioRouter.post('/',jwt, portfolioController.create);

// Update
portfolioRouter.put('/:id', jwt, portfolioController.update);

// Delete
portfolioRouter.delete('/:id', jwt, portfolioController.delete);

portfolioRouter.post('/search', portfolioController.search);

portfolioRouter.get('/count', jwt, portfolioController.count);


export default portfolioRouter;
