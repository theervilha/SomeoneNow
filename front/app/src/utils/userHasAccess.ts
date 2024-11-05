export const userHasAccess = async (token: string | undefined) => {
    try {
        const response = await fetch(`${process.env.SERVER_ENDPOINT}/api/user/protected_access`, {
            method: "POST",
            body: JSON.stringify({ 'token': token })
        });

        const resp = await response.json();
        console.log('resp:', resp)

        if (response.ok)
            return true
    } catch (e) {
        console.error('Erro ao verificar acesso:', e);
    }

    return false
};

export const getAuthCookie = (cookieHeader: string) => {
    const cookies = cookieHeader.split(";").reduce((prev, current) => {
        const [name, value] = current.trim().split("=");
        prev[name] = decodeURIComponent(value);
        return prev;
    }, {} as Record<string, string>);

    return cookies.auth_token
}