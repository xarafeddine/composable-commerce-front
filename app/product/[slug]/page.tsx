import Card from "@/components/product/card";
import { getProducts } from "@/lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

const productDetails = async () => {
  const products = await getProducts();
  const product = {
    id: 6,
    title: "Apple iPhone 11",
    image: "/images/products/iphone/iphone3.jpeg",
    price: 760,
    category: "Featured Products",
    details: `ecasf asdf lgkl wkljov oiqwuj sadfoi jlwe jf ois jfn lugosl weiu dfg
    fu ej vlckj asldfjs lkj f dfgsfdg dflskdfgjf df gsdfgdfg er t
    werewtth gfhfgnfgn rthewq ryn cxz n xxcv gfshs`,
  };
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={product.image} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {/* {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))} */}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{product.title}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{product.details}</p>
          <p className="price">${product.price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span
                className="minus"
                // onClick={decQty}
              >
                <AiOutlineMinus />
              </span>
              <span className="num">
                {/* {qty} */}
                {3}
              </span>
              <span
                className="plus"
                //  onClick={incQty}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              // onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button
              type="button"
              className="buy-now"
              //  onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Card key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default productDetails;
