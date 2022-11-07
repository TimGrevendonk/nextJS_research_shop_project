import NavBar from "../components/navbar";
import Page from "../components/page";
import { fetchJson } from "../lib/api";
import { useQuery } from "react-query";

function FormatCurrency(value) {
    return "$" + value.toFixed(2);
}

function BuildCartTable(cartItems) {
    let total = 0.0;
    const items = [];
    for (const cartItem of cartItems) {
        const itemTotal = cartItem.product.price * cartItem.quantity;
        total +=  itemTotal;
        items.push({...cartItem, total: itemTotal})
    }
    return { items, total };
}

// the cartItems are encapsulated to make the iterable.
function CartTable({ cartItems }) {
    // convert the items for total calcualtion.
    const cart = BuildCartTable(cartItems)
    return (
        <table className="cart">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
        <tbody>
            {cart.items.map((cartItem) => (
            <>
            <tr key={cartItem.id}>
                <td>{cartItem.product.title}</td>
                <td>{FormatCurrency(cartItem.product.price)}</td>
                <td>{cartItem.quantity}</td>
                <td>{FormatCurrency(cartItem.product.price * cartItem.quantity)}</td>
            </tr>
            </>
            ))}
        </tbody>
        <tfoot>
            <tr>
                <th>Total</th>
                <th></th>
                <th></th>
                <th>{FormatCurrency(cart.total)}</th>
            </tr>
        </tfoot>
    </table>
    )
}

export default function CartPage() {
    // call the "/api/cart" route to get the cartItems.
    const query = useQuery("cartItems", () => fetchJson("/api/cart"));
    // set the data from the query as cartitems.
    const cartItems = query.data;
    console.log('[cart] rendered: ', cartItems)
    return (
    <>
        <Page title={"Cart"}>
            {cartItems && (
                <CartTable cartItems={cartItems} />
            )}
        </Page>
    </>
  );
}
