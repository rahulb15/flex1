import jwt from '../middleware/auth';
import { Router } from "express";
const userRouter = Router();
const userController = require('../controllers/user.controller.js');

//created user count
userRouter.get('/createdCount', userController.userCreatedStatus);

// Retrieve All data
userRouter.get('/list', jwt, userController.findAll);

// Retrieve data with pagination
userRouter.get('/', jwt, userController.findPagination);

// Find one by ID
// userRouter.get('/:id', jwt, userController.findOne);

// Create
userRouter.post('/', jwt, userController.create);

// Update
userRouter.put('/:id', jwt, userController.update);

// Delete
userRouter.delete('/:id', jwt, userController.delete);

//permissions

userRouter.put('/permissions/:id', jwt, userController.permissions);
userRouter.put('/module/:id', jwt, userController.module);
// userRouter.put('/view_permission/:id', jwt, userController.view_permission);
// userRouter.put('/update_permission/:id', jwt, userController.update_permission);
// userRouter.put('/delete_permission/:id', jwt, userController.delete_permission);
userRouter.post('/emailSend', userController.emailSend);
userRouter.put('/reset/:id', userController.reset_password);

userRouter.get('/count', jwt, userController.count);

export default userRouter;
