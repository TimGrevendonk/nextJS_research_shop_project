import { fetchJson } from "./api";

// const CMS_URL =  process.env.CMS_URL;
// works like an import, from process.env import the CMS_URL for use (object destructering syntax).
const { CMS_URL } =  process.env;


export async function getProducts() {
    // fetch content from a URL given by the CMS.
    const products = await fetchJson(`${CMS_URL}/products`);
    return products.map(stripProduct);
  };

  
export async function getProduct(id) {
    // fetch content from a URL given by the CMS.
    const product = await fetchJson(`${CMS_URL}/products/${id}`);
    return stripProduct(product);
  };

  function stripProduct(product) {
    return {
        id: product.id,
        title: product.title,
        description: product.description,
    };
}
  

