import pool from '../database.js';

export interface Post {
    title: string,
    description?: string,
    category: string,
    price: number,
    images_url: string[],
}

export const get_posts = async () => {
    try {
        const result = await pool.query(`
            SELECT 
                p.id,
                p.title,
                p.description,
                p.category,
                p.price,
                p.created_at,
                ARRAY_AGG(pi.image_url) AS images_url
            FROM 
                posts p
            LEFT JOIN 
                posts_images pi ON p.id = pi.post_id
            GROUP BY 
                p.id;
        `);
        return result.rows;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

export const get_post_by_id = async (id: number) => {
    try {
        const result = await pool.query(`
            SELECT 
                p.id,
                p.title,
                p.description,
                p.category,
                p.price,
                p.created_at,
                ARRAY_AGG(pi.image_url) AS images_url
            FROM 
                posts p
            LEFT JOIN 
                posts_images pi ON p.id = pi.post_id
            WHERE p.id = $1
            GROUP BY 
                p.id;
        `, [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};

export const insert_post = async (post: Post) => {
    const { title, description, category, price, images_url } = post;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const query_insert_post = 'INSERT INTO posts(title, description, category, price) VALUES ($1, $2, $3, $4) RETURNING *'
        const result = await client.query(query_insert_post, [title, description, category, price]);
        const post_id = result.rows[0].id

        for (const image_url of images_url)
            await client.query('INSERT INTO posts_images(post_id, image_url) VALUES ($1, $2)', [post_id, image_url]);

        await client.query('COMMIT');
        return result.rows;

    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error inserting post:', error);
        throw error;
    }
};

export const update_post = async (id: number, post: Post) => {
    const { title, description, category, price, images_url } = post;
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const query_insert_post = `
            UPDATE posts
            SET title = $1, description = $2, category = $3, price = $4
            WHERE id = $5
            RETURNING *
        `
        const result = await client.query(query_insert_post, [title, description, category, price, id]);

        if (images_url.length > 0) {
            const post = await get_post_by_id(id);

            const images_to_delete = post.images_url.filter((row: string) => !images_url.includes(row))
            for (const image_url of images_to_delete)
                await client.query('DELETE FROM posts_images WHERE post_id = $1 AND image_url = $2', [id, image_url]);

            const images_to_add = images_url.filter(row => !post.images_url.includes(row))
            for (const image_url of images_to_add)
                await client.query('INSERT INTO posts_images(post_id, image_url) VALUES ($1, $2)', [id, image_url]);
        }

        await client.query('COMMIT');
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK')
        console.error('Error updating post:', error);
        throw error;
    }
};

export const delete_post = async (id: number) => {
    try {
        await pool.query(`DELETE FROM posts WHERE id = $1;`, [id]);
        return true
    } catch (error) {
        console.error('Error getting posts:', error);
        throw error;
    }
};