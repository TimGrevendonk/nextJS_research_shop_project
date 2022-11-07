import { fetchJson } from "../../lib/api";

const { CMS_URL } = process.env;

// strip exxes data from the cardItem.
function stripCartItem(cartItem) {
    console.log("############",cartItem);
    return {
        id: cartItem.id,
        product: {
            id: cartItem.product.id,
            title: cartItem.product.title,
            price: cartItem.product.price,
        },
        quantity: cartItem.quantity,
    };
}

export default async function HandleCart(request, response) {
    switch (request.method) {
        case "GET":
            return HandleGetCart(request, response);
        case "POST":
            return HandlePostCart(request, response);
        default:
            console.log("default");
            response.status(405).end();
    }
}

// Executed when the api/cart route is called.
async function HandleGetCart(request, response) {
    // Get the webtoken.
    const { jwt } = request.cookies;
    // Response not authorized if no webtoken.
    if (!jwt) {
        response.status(401).end();
        return;
    }
    try {
        // Get all cart items for this user.
        const cartItems = await fetchJson(`${CMS_URL}/cart-items`, {
            headers: { "Authorization": `Bearer ${ jwt }` },
        });
        // convert each cart item so not to much properties are left.
        response.status(200).json(cartItems.map(stripCartItem));
    } catch (err) {
        console.log(err)
        response.status(401).end();
    }
}

async function HandlePostCart(request, response) {
    // Get the webtoken.
    const { jwt } = request.cookies;
    // Response not authorized if no webtoken.
    if (!jwt) {
        response.status(401).end();
        return;
    }
    const { productId, quantity } = request.body;
    try {
        await fetchJson(`${CMS_URL}/cart-items`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ jwt }`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ product: productId, quantity }),
        });
        response.status(200).json({});
    } catch (err) {
        response.status(401).end();
    }

} 


