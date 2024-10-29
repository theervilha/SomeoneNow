import pool from '../database.js';

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
                ARRAY_AGG(pi.image_url) AS images
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