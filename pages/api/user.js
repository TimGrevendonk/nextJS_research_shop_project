import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

export default async function handleUser(request, response) {
    // read the cookie token.
    const { jwt } = request.cookies;
    if (!jwt) {
        // 401 unauthorized.
        console.log("helloz? jwt")
        response.status(401).end();
        return;
    }
    try {
        // get own user account. (userSSSSSS!)
        const user = await fetchJson(`${CMS_URL}/users/me`, {
            headers: { "Authorization": `Bearer ${jwt}` },
        });
        response.status(200).json({
            id: user.id,
            name: user.username,
        })
        console.log("lllogin response", user.username)
    } catch (err) {
        console.log(err);
        response.status(401).end();
    }
}