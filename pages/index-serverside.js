// link is used for client side navigation, the Link tag replaces the <a> tags.
import Link from "next/link";
import Head from 'next/head';
import Title from "../components/title";
import { getProducts } from "../lib/products";

/* fetch products on server side */

// this is the way to keep static web pages for elsision!!!!
export async function getStaticProps() {
  console.log("[HomePage] getStaticProps()");
  // fetch content from a URL given by the CMS (from other file).
  const products = await getProducts();
  // Set the products into props objects.
  return { props: { products } }
};

export default function HomePage({ products }) {
  console.log("[HomePage] render: ", products);
  return (
    <>
      <Head>
        <title>nextjs tim shop</title>
        <meta name="description" content="Generated by create next app" />
        {/* specifically mention from where the favicon should be loaded from relative from the public folder. */}
        <link rel="icon" href="/icons/favicon.ico" />
      </Head>
      <main className="homepage">
        <Title>NextJS tim shop <Link href="https://nextjs.org">Next.js!</Link></Title>
        <ul>
          {/* A foreach using map (mapping items into HTML outputs) */}
          {products.map((product) => (
            // Every react component needs a key.
            <li key={product.id}>
              {product.title}
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
