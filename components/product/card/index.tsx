import React from "react";

export default function Card({ product }: { product: any }) {
  return (
    <div className="w-1/2 h-1/2 border border-sky-500 flex flex-col justify-center items-center">
      <img src={product.image} alt={product.title} />
      <div>
        <h3 className="text-center">{product.title}</h3>
      </div>
    </div>
  );
}
