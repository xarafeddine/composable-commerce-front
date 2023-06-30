"use clent";

import { cartItem } from "@/lib/models";
import useProductsStore from "@/lib/store";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const QtyHandler = ({ item }: { item: cartItem }) => {
  const { updateCart } = useProductsStore((state) => state);

  return (
    <div>
      <p className="quantity-desc">
        <span
          className="minus"
          onClick={
            () =>
              updateCart({
                ...item,
                quantity: Math.max(0, item.quantity - 1),
              })
            // toggleCartItemQuanitity(item.productId, "dec")
          }
        >
          <AiOutlineMinus />
        </span>
        <span className="num">{item.quantity}</span>
        <span
          className="plus"
          onClick={
            () =>
              updateCart({
                ...item,
                quantity: Math.min(item.quantity + 1, 20),
              })

            // toggleCartItemQuanitity(item.productId, "inc")
          }
        >
          <AiOutlinePlus />
        </span>
      </p>
    </div>
  );
};

export default QtyHandler;
