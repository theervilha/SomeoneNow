export async function isAuthenticatedRequest(request: Request) {
    const cookieHeader = request.headers.get("Cookie");
    if (!cookieHeader) {
        return { isAuthenticated: false }
    }

    let authToken = getAuthCookie(cookieHeader);
    const userData = await getUserFromJWTToken(authToken)
    if (!userData) {
        return { isAuthenticated: false }
    }

    return {
        isAuthenticated: true,
        userEmail: userData.user.email
    }
}

const getAuthCookie = (cookieHeader: string) => {
    const cookies = cookieHeader.split(";").reduce((prev, current) => {
        const [name, value] = current.trim().split("=");
        prev[name] = decodeURIComponent(value);
        return prev;
    }, {} as Record<string, string>);

    return cookies.auth_token
}

export const getUserFromJWTToken = async (token: string | undefined) => {
    try {
        const response = await fetch(`${process.env.SERVER_ENDPOINT}/api/user/protected_access`, {
            method: "POST",
            body: JSON.stringify({ 'token': token })
        });

        const resp = await response.json();

        if (response.ok)
            return resp
    } catch (e) {
        console.error('Erro ao verificar acesso:', e);
    }

    return {}
};