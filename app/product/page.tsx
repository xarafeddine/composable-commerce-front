"use client";

import ProductsList from "@/components/product/list";
import { getProducts } from "@/lib/client";
import styles from "./productsList.module.css";
import useProductsStore from "@/lib/store";

import { SetStateAction, useEffect, useState } from "react";
import { Product } from "@/lib/models";
import { useRouter } from "next/router";

const ProductsPage = () => {
  const { productsList, categories } = useProductsStore((state) => state);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [searchedResults, setSearchedResults] = useState(productsList);

  // const router = useRouter();
  const [filteredProducts, setFiltredProducts] = useState(productsList);
  const [filterParams, setFilterParams] = useState({
    selectedCategory: "",
    selectedPrice: "",
    selectedRating: "",
  });

  const changeFilterParams = (e: any) => {
    console.log("asdfsadfasf");
    setFilterParams((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const filter = (
    products: Product[],
    { selectedCategory, selectedPrice, selectedRating }: any
  ) => {
    let filtered = products;

    if (selectedCategory !== "")
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );

    if (selectedPrice !== "") {
      if (selectedPrice === "under-50") {
        filtered = filtered.filter((product) => product.price <= 50);
      } else if (selectedPrice === "50-100") {
        filtered = filtered.filter(
          (product) => product.price > 50 && product.price <= 100
        );
      } else if (selectedPrice === "over-100") {
        filtered = filtered.filter((product) => product.price > 100);
      }
    }

    if (selectedRating !== "") {
      filtered = filtered.filter((product) => {
        const rating = product.rating;
        if (rating) return rating >= selectedRating;
        return true;
      });
    }

    return filtered;
  };

  const filterProducts = (searchedText: string) => {
    const regex = new RegExp(searchedText, "i"); // 'i' flag for case-insensitive search
    return productsList.filter((prod) => regex.test(prod.title));
  };

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    const timeout = setTimeout(() => {
      const searchResult = filterProducts(e.target.value);
      setSearchedResults(searchResult);
    }, 500);
    // debounce method
    setSearchTimeout(timeout);
  };

  useEffect(() => {
    setFiltredProducts(filter(searchedResults, filterParams));
  }, [filterParams, searchedResults]);

  return (
    <div className={styles["products-list"]}>
      <div className={styles["filters"]}>
        <h2 className="font-bold text-lg">Filters:</h2>

        <div className={styles["filter-group"]}>
          <label>Search:</label>

          <input
            type="text"
            name="search"
            placeholder="Search for products..."
            autoComplete="off"
            value={searchText}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 text-black"
          />
        </div>
        <div className={styles["filter-group"]}>
          <label>Category:</label>
          <select
            className="w-full px-4 py-2 text-black"
            name="selectedCategory"
            onChange={changeFilterParams}
            value={filterParams.selectedCategory}
          >
            <option value="">All</option>
            {categories.map((category, index) => {
              return (
                <option key={index} value={category}>
                  {category}
                </option>
              );
            })}
          </select>
        </div>
        <div className={styles["filter-group"]}>
          <label>Price:</label>
          <select
            className="w-full px-4 py-2 text-black"
            name="selectedPrice"
            onChange={changeFilterParams}
            value={filterParams.selectedPrice}
          >
            <option value="">All</option>
            <option value="under-50">$50 or less</option>
            <option value="50-100">$50 - $100</option>
            <option value="over-100">$100 or more</option>
          </select>
        </div>
        <div className={styles["filter-group"]}>
          <label>Rating:</label>
          <select
            className="w-full px-4 py-2 text-black"
            name="selectedRating"
            onChange={changeFilterParams}
            value={filterParams.selectedRating}
          >
            <option value="">All</option>
            <option value="4">4 stars or more</option>
            <option value="3">3 stars or more</option>
            <option value="2">2 stars or more</option>
            <option value="1">1 star or more</option>
          </select>
        </div>
      </div>
      <div className={styles["products"]}>
        <h2 className="font-bold text-lg">Products List</h2>
        <ProductsList products={filteredProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
