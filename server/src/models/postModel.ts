import prisma from '../database.js';

export interface Post {
    title: string,
    description?: string,
    category: string,
    price: number,
    images_url: string[],
    userId?: number
}

export const get_posts = async () => {
    try {
        const posts = await prisma.post.findMany()
        return posts
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

export const get_post_by_id = async (id: number) => {
    try {
        return await prisma.post.findUnique({
            where: {
                id: id
            }
        })
    } catch (error) {
        console.error('Error getting post by id:', error);
        throw error;
    }
};

export const insert_post = async (post: Post) => {
    try {
        const createdPost = await prisma.post.create({
            data: {
                title: post.title,
                description: post.description,
                category: post.category,
                price: post.price,
                images_url: post.images_url,
                user: {
                    connect: { id: post.userId }
                }
            }
        })
        return createdPost
    } catch (error) {
        console.error('Error inserting post:', error);
        throw error;
    }
};

export const update_post = async (id: number, post: Post) => {
    try {
        const updatedPost = await prisma.post.update({
            where: {
                id: id
            },
            data: post
        })
        return updatedPost
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};

export const delete_post = async (id: number) => {
    try {
        const deletedPost = await prisma.post.delete({
            where: {
                id: id
            },
        })
        return true
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};