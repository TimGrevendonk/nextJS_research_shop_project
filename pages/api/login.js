import cookie from "cookie";
import { fetchJson } from "../../lib/api";

const { CMS_URL } =  process.env;

export default async function handleLogin(request, response){
    // Only allow post requests, give different response if it is not a post request.
    if (request.method !== "POST") {
        // 405 method not allowed.
        response.status(405).end();
        return;
    }
    const {email, password} = request.body;
    try{
        // jwt = jsonWebTocken for cookies (cookies hold sensitive data).
        const { jwt, user } = await fetchJson(`${CMS_URL}/auth/local`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier: email, password  }),
        });
        
        response.status(200)
        // set the cookie.
        .setHeader("Set-Cookie", cookie.serialize("jwt", jwt, {
            // to which path will the cookie be sent to.
            path: "/api",
            // only send the cookie as a header when making server requests. but hidden from JS code.
            httpOnly: true,
        }))
        .json({ 
            id: user.id,
            name: user.username
        });
    } catch (err) {
        console.log(err);
        // 401 = unauthorised.
        response.status(401).end();
    }
}