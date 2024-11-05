import { MetaFunction, redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
    return [
        { title: "Someone Now" },
        { name: "description", content: "Encontre seu serviço agora" },
    ];
};

export async function action() {
    await fetch(`${process.env.SERVER_ENDPOINT}/api/user/logout`, {
        method: "POST"
    });
    return redirect("/");
}

export default function Logout() {
    const fetcher = useFetcher();

    useEffect(() => {
        fetcher.submit(null, { method: "post", action: "/logout" });
    }, [])

    return (
        <p>Deslogando...</p>
    )
}