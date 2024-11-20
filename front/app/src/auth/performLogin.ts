export async function performLogin(email: string, password: string) {
    const resp = await fetch(`${process.env.SERVER_ENDPOINT}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email,
            password
        }),
        credentials: 'include'
    });

    if (resp.ok) {
        const token = await resp.json()
        return token
    }

    throw new Error(
        (await resp.json()).error || "Login failed"
    )
}