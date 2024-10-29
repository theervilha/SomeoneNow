import { Hono } from 'hono';
import * as postController from '../controllers/postController.js';

const postRoutes = new Hono();

postRoutes.get('/', postController.getPosts);

export default postRoutes;
