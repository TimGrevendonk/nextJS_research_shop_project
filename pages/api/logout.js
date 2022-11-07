
import cookie from "cookie";

export default function handleLogout(request, response) {
    response.status(200)
    .setHeader("Set-Cookie", cookie.serialize("jwt", "", {
        path: "/api",
        // date in the past says this is expired (log out);
        expires: new Date(0),
    }))
    .json({})
}