import prisma from '../database.js';

export interface User {
    email: string,
    password: string
}

export const register = async (user: User) => {
    try {
        const createdUser = await prisma.user.create({
            data: user
        })
        return createdUser
    } catch (error) {
        console.error('Error register user:', error);
        throw error;
    }
};

export const get_user_by_email = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        return user
    } catch (error) {
        console.error('Error get user:', error);
        throw error;
    }
};