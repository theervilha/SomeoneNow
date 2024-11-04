import { Hono } from 'hono';
import { jwt } from 'hono/jwt'
import * as userController from '../controllers/userController.js';

const userRoutes = new Hono();

userRoutes.post('/register', userController.register);
userRoutes.post('/login', userController.login);
userRoutes.get('/:email', jwt({ secret: process.env.JWT_SECRET as string }), userController.getUser);

export default userRoutes;
