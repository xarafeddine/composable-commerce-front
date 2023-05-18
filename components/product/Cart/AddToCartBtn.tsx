"use client";

import useProductsStore from "@/lib/store";
import toast from "react-hot-toast";

const AddToCartBtn = ({ productId }: { productId: number }) => {
  const { addToCart } = useProductsStore((state) => state);

  return (
    <div>
      {/* <div className="quantity">
        <h3>Quantity:</h3>
        <QtyHandler item={item} />
      </div> */}

      <div className="buttons">
        <button
          type="button"
          className="add-to-cart"
          onClick={() => {
            addToCart(productId);
            toast.success("Added to cart");
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default AddToCartBtn;
