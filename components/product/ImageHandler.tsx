"use client";

import { getImages } from "@/lib/client";
import { Product } from "@/lib/models";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageHandler = ({ product }: { product: Product }) => {
  const [images, setImages] = useState<string[]>([product.image]);
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    setImages(getImages(product));
  }, [product]);

  return (
    <div className="w-fit">
      <div className="image-container">
        <Image
          width={400}
          height={400}
          src={images[imgIndex]}
          className="product-detail-image"
          alt={product?.title}
        />
      </div>
      <div className="small-images-container">
        {images?.map((item, i) => (
          <Image
            key={i}
            width={100}
            height={100}
            src={item}
            className={
              i === imgIndex ? "small-image selected-image" : "small-image"
            }
            onClick={() => setImgIndex(i)}
            alt={""}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageHandler;
