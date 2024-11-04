import pool from '../database.js';

export interface User {
    email: string,
    password: string
}

export const register = async ({ email, password }: User) => {
    try {
        const result = await pool.query(`
            INSERT INTO users (email, password)
            VALUES ($1, $2)
            RETURNING *
        `, [email, password]);
        return result.rows;
    } catch (error) {
        console.error('Error register user:', error);
        throw error;
    }
};

export const get_user_by_email = async (email: string) => {
    try {
        const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        return result.rows[0] || null;
    } catch (error) {
        console.error('Error get user:', error);
        throw error;
    }
};