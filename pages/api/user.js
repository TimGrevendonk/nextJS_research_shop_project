import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

export default async function handleUser(request, response) {
    // read the cookie token.
    const jwt = request.cookies;
    if (!jwt) {
        // 401 unauthorized.
        response.status(401).end();
        return;
    }
    try {
        const user = await fetchJson(`${CMS_URL}/user/me`, {
        headers: {"Authorization": `Bearer ${jwt}`},
        });
        response.status(200).json({
            id: user.id,
            name: user.username,
        })
    } catch (err) {
        response.status(401).end();
    }
}