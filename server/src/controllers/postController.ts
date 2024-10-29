import { type Context } from "hono";
import * as postModel from "../models/postModel.js";

export const getPosts = async (c: Context) => {
    try {
        const posts = await postModel.get_posts()
        return c.json(posts, 200)
    } catch (e) {
        return c.json({ error: 'Erro ao buscar posts' }, 500);
    }
}
