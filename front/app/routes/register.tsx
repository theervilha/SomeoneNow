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
        const resp = await fetch(`${process.env.SERVER_ENDPOINT}/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
        });

        const resp_json = await resp.json()

        return redirect(`/login`);
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        return {
            status: 400
        };
    }
};

export default function Register() {
    return (
        <LoginForm isRegisterPage={true} />
    )
}