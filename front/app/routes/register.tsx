import {
    ActionFunctionArgs,
    redirect,
} from "@remix-run/node";

import { performLogin } from "~/src/auth/performLogin";
import LoginForm from '../src/components/LoginForm';

export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData)

    try {
        const resp = await fetch(`${process.env.SERVER_ENDPOINT}/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const resp_json = await resp.json()
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return {
            status: 400
        };
    }

    try {
        const token = await performLogin(userData.email as string, userData.password as string)
        return redirect(`/`, {
            headers: {
                "Set-Cookie": `auth_token=${token}; Max-Age=3600; Path=/; SameSite=Lax`
            }
        });
    } catch (error) {
        return redirect('/login')
    }
}

export default function Register() {
    return (
        <LoginForm isRegisterPage={true} />
    )
}