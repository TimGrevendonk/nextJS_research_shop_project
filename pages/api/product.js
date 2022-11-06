// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getProducts } from "../../lib/products"

export default async function handler(request, response) {
  console.log("[api/product] render: ");
  const products = await getProducts()
  response.status(200).json(products)
}
