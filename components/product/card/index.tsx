import { Product } from "@/lib/models";
import Link from "next/link";
interface Props {
  product: Product;
}

const Card = ({ product: { image, title, slug, price } }: Props) => {
  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className="product-card">
          <img
            src={image}
            width={250}
            height={250}
            className="product-image"
            alt={title}
          />
          <p className="product-name">{title}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
