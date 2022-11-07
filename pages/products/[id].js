// [id] is the path parameter to idenitfy each product (page).

import Head from "next/head";
import Image from "next/image";
import AddToCartWidget from "../../components/addtocart";
import Page from "../../components/page";
import Title from "../../components/title";
import useUser from "../../hooks/user";
import { ApiError } from "../../lib/api";
import { getProducts, getProduct } from "../../lib/products";

// is a dynamic route, so it needs a getStaticPaths to list all URL pahts for each product.
export async function getStaticPaths() {
    const products = await getProducts();
    return {
        paths: products.map((product) => ({
            params: { id: product.id.toString() },
        })),
        // what the server should do if the page is not found.
        // fallback: false, // 404 page
        // fallback: true,  // not supported by "next export", paths will be rendered at build time, and the true page will replace a placeholder whe nready.
        // blocking wil generate the new page and returns it to the browser (the response is blocked untill the new page is ready).
        fallback: "blocking",
    };
}

// fetch data for an individual product.
export async function getStaticProps({params: { id }}){
    console.log("[getStaticProps] render: ", id );
    // if the cal throws the (self implemented) error, return the catch statement.
    try {
        const product = await getProduct(id);
        return {
            props: { product },
            // revalidate is needed if the "parent" also has revalidate to also renew date on this page.
            revalidate: parseInt(process.env.REVALIDATE_SECONDS), // set string to int (seconds)
        };
    } catch (err){
        // check if the error is part of the API AND the result is 404 , show that is does not exist.
        if (err instanceof ApiError && err.status === 404){
            // if error thrown, return 404 notfound page. (instead of server error)
            return { notFound: true };
        }
        // if error is not part of our error handelers, just throw the error nextJS made.
        throw err;
    }
}


export default function ProductPage({product}){
    console.log("[productPage] rendered:");

    const user = useUser();

    return(
        <Page title={product.title}>
            <div className="productpage">
                <Image src={product.pictureUrl} alt=""
                width={680} height={480}
                />
                <p>
                    <b>{product.price}</b>
                    {user && (
                        <>
                        <span> Only for {user.name}!</span>
                        <AddToCartWidget productId={product.id}/>
                        </>
                    )}
                </p>
                <p>
                    {product.description}
                </p>
            </div>
        </Page>
    );
}
