import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
    return (
        <li className="productcard">
            <Link href={`/products/${product.id}`}>
                <Image src={product.pictureUrl} alt=""
                width={320} height={240}
                />
                <div>
                    <h1>
                        {product.title}
                    </h1>
                    <p>
                        {product.price}
                    </p>
                </div>
                <p>
                    {product.description}
                </p>
            </Link>
        </li>
    );
}