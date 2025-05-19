import { Router } from 'express';
import { deleteUser, getUser, getUsers, updateUser } from '../controllers/userController';


export const userRouter = Router();

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
// userRouter.post('/', );
userRouter.delete('/:id', deleteUser);
userRouter.put('/:id', updateUser);
