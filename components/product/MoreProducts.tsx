"use client";

import { useEffect, useState } from "react";
import ProductsList from "./list";

const getProducts = async () => {
  //   const SPACE_ID = "nl5wmixyk6t3";
  //   const ACCESS_TOKEN = "RHRJ-g3wm1RyivqBMmrHtzu9a6Ax_Y1PCWsr2zCrrB4";
  const spaceId = process.env.NEXT_PUBLIC_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
  const res = await fetch(
    `http://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  console.log("loging data", data);
  return data.items;
  // const res = await axios.get(
  //   `http://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?access_token=${accessToken}`
  // );
  // const data = res.data;
  // console.log("loging data", data);
  // return data.items;
};

const MoreProducts = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </>
  );
  // const [prods, setProds] = useState([]);

  // const fetchMore = async () => {
  //   const products = await getProducts();
  //   console.log("client:", products);
  //   setProds((prev: any) => prev.concat(products));
  // };
  // return (
  //   <>
  //     <button onClick={fetchMore}>show more</button>
  //     <ProductsList products={prods} />
  //   </>
  // );
};

export default MoreProducts;
