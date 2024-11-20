import {
    type MetaFunction,
    ActionFunctionArgs,
    redirect,
} from "@remix-run/node";

import { performLogin } from "~/src/auth/performLogin"
import LoginForm from '../src/components/LoginForm';

export const meta: MetaFunction = () => {
    return [
        { title: "Someone Now" },
        { name: "description", content: "Encontre seu serviço agora" },
    ];
};

export const action = async ({
    request,
}: ActionFunctionArgs) => {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData)

    try {
        const token = await performLogin(userData.email as string, userData.password as string)
        return redirect(`/`, {
            headers: {
                "Set-Cookie": `auth_token=${token}; Max-Age=3600; Path=/; SameSite=Lax`
            }
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return {
            status: 400,
            error: error
        };
    }
};

export default function Login() {
    return (
        <LoginForm isRegisterPage={false} />
    )
}