import { Hono } from 'hono';
import * as postController from '../controllers/postController.js';

const postRoutes = new Hono();

postRoutes.get('/', postController.getPosts);
postRoutes.get('/:id', postController.getPostById);
postRoutes.post('/', postController.insertPost);
postRoutes.put('/:id', postController.updatePost);
postRoutes.delete('/:id', postController.deletePost);

export default postRoutes;
