import { Product } from "@/lib/models";
import Link from "next/link";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
interface Props {
  product: Product;
}

const Card = ({ product: { image, title, slug, price, rating } }: Props) => {
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
          <div className="reviews">
            <div className="flex flex-row">
              {rating
                ? Array(Math.round(rating.rate))
                    .fill(0)
                    .map((_, index) => <AiFillStar key={index} />)
                    .concat(
                      Array(5 - Math.round(rating.rate))
                        .fill(0)
                        .map((_, index) => (
                          <AiOutlineStar key={index + rating.rate} />
                        ))
                    )
                : "no review"}
            </div>
          </div>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
