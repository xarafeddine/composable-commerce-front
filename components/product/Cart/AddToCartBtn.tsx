"use client";

import useProductsStore from "@/lib/store";
import toast from "react-hot-toast";

const AddToCartBtn = ({ productId }: { productId: number }) => {
  const { addToCart } = useProductsStore((state) => state);

  return (
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
  );
};

export default AddToCartBtn;
