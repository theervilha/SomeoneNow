import { type Context } from "hono";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import * as userModel from "../models/userModel.js";

export const register = async (c: Context) => {
    try {
        const { email, password }: userModel.User = await c.req.json();

        const existingUser = await userModel.get_user_by_email(email);
        if (existingUser) {
            return c.json({ error: 'Email já existe' }, 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.register({ email, "password": hashedPassword });
        return c.json(user, 201);
    } catch (e) {
        console.error('Erro ao registrar usuário: ', e)
        return c.json({ error: 'Erro ao registrar usuário' }, 500);
    }
}

export const login = async (c: Context) => {
    try {
        const { email, password }: userModel.User = await c.req.json();

        const existingUser = await userModel.get_user_by_email(email);
        if (!existingUser) {
            return c.json({ error: 'Email não existe' }, 400);
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return c.json({ error: 'Senha inválida' }, 400);
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return c.json(token, 200);
    } catch (e) {
        console.error('Erro ao logar usuário: ', e)
        return c.json({ error: 'Erro ao logar usuário' }, 500);
    }
}

export const protected_access = async (c: Context) => {
    const { token } = await c.req.json();

    if (!token) {
        return c.json({ error: 'Não autenticado' }, 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return c.json({ message: 'Acesso liberado', user: decoded }, 200);
    } catch {
        return c.json({ error: 'Token inválido ou expirado' }, 401);
    }
}


export const getUser = async (c: Context) => {
    try {
        const email = await c.req.param('email');

        const user = await userModel.get_user_by_email(email);
        if (!user) {
            return c.json({ error: 'Email não existe' }, 400);
        }

        return c.json(user, 200);
    } catch (e) {
        console.error('Erro ao get usuário: ', e)
        return c.json({ error: 'Erro ao get usuário' }, 500);
    }
}