import {
    type MetaFunction,
    ActionFunctionArgs,
    redirect,
} from "@remix-run/node";

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

    try {
        const resp = await fetch(`${process.env.SERVER_ENDPOINT}/api/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
            credentials: 'include'
        });


        if (resp.ok) {
            const token = await resp.json()
            return redirect(`/`, {
                headers: {
                    "Set-Cookie": `auth_token=${token}; Max-Age=3600; Path=/; SameSite=Lax`
                }
            });
        } else {
            const errorData = await resp.json();
            console.error('Login error:', errorData.error);
            return {
                status: 400,
                error: errorData.error
            };
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return {
            status: 400
        };
    }
};

export default function Login() {
    return (
        <LoginForm isRegisterPage={false} />
    )
}