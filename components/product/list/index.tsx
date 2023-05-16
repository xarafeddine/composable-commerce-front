
import Card from "../card";
import { Product } from "@/lib/models";

const ProductsList = ({ products }: { products: Product[] }) => {

  return (
    <div className="products-container">
      {products.length === 0 ? (
        <p>empty :(</p>
      ) : (
        products?.map((product: Product) => (
          <Card key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default ProductsList;
