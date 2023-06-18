import { Product } from "../models";
import data from "../store/products.json";
const slugify = (str: string) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getProducts = () => {
  const prods = data.products;
  return prods.map((prod) => ({
    ...prod,
    slug: slugify(`${prod.title}_id_${prod.id}`),
  }));
};

export const getProduct = (slug: string | undefined) => {
  if (!slug) return undefined;
  const prods = getProducts();
  return prods.find((prod) => prod.slug === slug);
};

export const getRelatedProducts = (category: string) => {
  const prods = getProducts();
  return prods.filter((prod) => prod.category === category);
};

export const getImages = (product: Product) => {
  const prods = getProducts();
  return prods
    .filter((prod) => prod.title === product.title)
    .slice(0, 5)
    .map((prod) => prod.image);
};

export const getCategories = () => {
  const prods = getProducts();

  return prods.reduce((accu: string[], curr) => {
    if (curr.category && !accu.includes(curr.category)) {
      return [...accu, curr.category];
    }
    return accu;
  }, []);
};

export const getBanner = () => {
  return {
    smallText: "wireless",
    midText: "Beast solo",
    largeText: "HEADPHONE",
    image: "/images/products/headphones_c/headphones_c_1.webp",
    image2: "/images/products/headphones_a/headphones_a_4.webp",
    product: "boat-headphone-c-4321-id-27",
    product2: "boat-headphone-a-4321-id-22",
    buttonText: "SHOP NOW",
    desc: "Experience crystal-clear audio like never before with our advanced Active Noise Cancellation (ANC) technology. Immerse yourself in your favorite tracks or podcasts without distractions as our headphones intelligently detect and cancel out background noise.",
    largeText1: "fine",
    largeText2: "smile",
    saleTime: "14 Nov to 3 dec",
    discount: "20",
  };
};
