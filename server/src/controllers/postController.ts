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

export const getPostById = async (c: Context) => {
    const id = Number(c.req.param('id'));

    try {
        const post = await postModel.get_post_by_id(id)
        if (post) {
            return c.json(post, 200)
        }

        return c.json({ error: 'Post não encontrado' }, 404)
    } catch (e) {
        return c.json({ error: 'Erro ao buscar post' }, 500);
    }
}

export const insertPost = async (c: Context) => {
    const { title, description, category, price, images_url } = await c.req.json();
    const postVars: postModel.Post = {
        title: title,
        description: description,
        category: category,
        price: Number(price),
        images_url: images_url,
    }

    try {
        const post = await postModel.insert_post(postVars)
        return c.json(post, 201)
    } catch (e) {
        return c.json({ error: 'Erro ao inserir post' }, 500);
    }
}
