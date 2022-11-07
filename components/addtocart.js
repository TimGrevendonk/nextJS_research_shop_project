import Button from "./button"
import FormField from "../components/formfield";
import Input from "../components/input";
import { useState } from "react";
import { useRouter } from "next/router";
import { fetchJson } from "../lib/api";
import { useMutation } from "react-query";

export default function AddToCartWidget({ productId }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const mutation = useMutation(() => 
    fetchJson("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    }));  

  const handleClick = async () => {
    await mutation.mutateAsync();
    router.push("/cart")
    // console.log("toadd", { productId, quantity });
  };

   return (
    <div>
      <FormField label={"Quantity:"}>
        <Input type={"number"} required 
          value={quantity.toString()} 
          onChange={(event) => setQuantity(parseInt(event.target.value))}/>
      </FormField>
      {mutation.isLoading ? (
        <p>Loading...</p>
      ): (
        <Button onClick={handleClick}>
          Add to cart
        </Button>
      )}
    </div>
  );
}
