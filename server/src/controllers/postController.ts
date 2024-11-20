import { type Context } from "hono";
import * as postModel from "../models/postModel.js";
import { get_user_by_email } from "../models/userModel.js";

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
    const { title, description, category, price, images_url, userEmail } = await c.req.json();

    const user = await get_user_by_email(userEmail)
    if (!user) {
        return c.json({ error: 'Usuário não encontrado' }, 400);
    }

    const postVars: postModel.Post = {
        title: title,
        description: description,
        category: category,
        price: Number(price),
        images_url: images_url,
        userId: user.id
    }

    try {
        const post = await postModel.insert_post(postVars)
        return c.json(post, 201)
    } catch (e) {
        return c.json({ error: 'Erro ao inserir post' }, 500);
    }
}

export const updatePost = async (c: Context) => {
    const id = Number(c.req.param('id'));
    const updates = await c.req.json();

    const post = await postModel.get_post_by_id(id);
    if (!post) {
        return c.json({ error: "Post não encontrado" }, 404);
    }

    const updatedPostVars: postModel.Post = {
        title: updates.title !== undefined ? updates.title : post.title,
        description: updates.description !== undefined ? updates.description : post.description,
        category: updates.category !== undefined ? updates.category : post.category,
        price: updates.price !== undefined ? updates.price : post.price,
        images_url: updates.images_url !== undefined ? updates.images_url : post.images_url,
    };

    try {
        await postModel.update_post(id, updatedPostVars)
        return c.json({ message: 'Post atualizado com sucesso' }, 200)
    } catch (e) {
        return c.json({ error: 'Erro ao inserir post' }, 500);
    }
}

export const deletePost = async (c: Context) => {
    const id = Number(c.req.param('id'));

    try {
        await postModel.delete_post(id)
        return c.json({ message: 'Post excluído com sucesso' }, 200)
    } catch (e) {
        return c.json({ error: 'Erro ao inserir post' }, 500);
    }
}
