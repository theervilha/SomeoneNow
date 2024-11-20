import { redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

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