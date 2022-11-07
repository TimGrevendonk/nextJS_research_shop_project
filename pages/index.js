// link is used for client side navigation, the Link tag replaces the <a> tags.
import Link from "next/link";
import { getProducts } from "../lib/products";
import ProductCard from "../components/productcard";
import Page from "../components/page";

/* fetch products on server side 
with incremental static regeneration (ISR no longer fully static website, need node / nextJS support platform)

add option to object from 'getStaticprops' revalidate (renew per X seconds)
will set the content to be expired and IF the page is reloaded it will update the data.*/

export async function getStaticProps() {
  console.log("[HomePage] getStaticProps()");
  // fetch content from a URL given by the CMS (from other file).
  const products = await getProducts();
  // Set the products into props objects.
  return { 
    props: { products },
    // good if pages may change, but renewed data is not very important.
    revalidate: parseInt(process.env.REVALIDATE_SECONDS), // set string to int (seconds)
  };
};

export default function HomePage({ products }) {
  console.log("[HomePage] render: ");
  return (
    <Page title={"indoor plants"}>
      <div className="homepage">
        <ul>
          {/* A foreach using map (mapping items into HTML outputs) */}
          {products.map((product) => (
            // Every react component needs a key.
            <div key={product.id}>
              {/* insert productCard compenent, giving it the product parameter as value as "product" */}
              <ProductCard product={product}></ProductCard>
            </div>
          ))}
        </ul>
      </div>
    </Page>
  )
}
