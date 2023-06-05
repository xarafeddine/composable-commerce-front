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
    rating: Math.round(Math.random() * 5),
    isInCart: false,
    slug: slugify(`${prod.title}_id_${prod.id}`),
    details: prod.details || `The TechPro Wireless Bluetooth Earbuds offer a seamless and hassle-free listening experience. With advanced Bluetooth 5.0 technology, you can effortlessly pair them with your smartphone, tablet, or any other Bluetooth-enabled device. Say goodbye to tangled wires and embrace the freedom of true wireless audio.
    Designed with comfort in mind, these earbuds feature a lightweight and ergonomic design that fits snugly in your ears. The soft silicone ear tips provide a secure and comfortable fit, ensuring hours of uninterrupted listening pleasure. Whether you're running, working out, or simply relaxing, these earbuds stay securely in place, delivering music to fuel your activities.
    Experience crystal-clear sound with enhanced bass and dynamic audio performance. The TechPro Wireless Bluetooth Earbuds utilize advanced noise-canceling technology, allowing you to immerse yourself in your favorite tunes without any distractions from the outside world. Feel the music come alive and enjoy a truly immersive audio experience.`,
  }));
};

export const getProduct = async (slug: string) => {
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

export const getBanner = async () => {
  return {
    smallText: "wireless",
    midText: "Beast solo",
    largeText: "HEADPHONE",
    image: "/images/banner_03.webp",
    image2: "/images/banner_04.webp",
    product: "2",
    buttonText: "SHOP NOW",
    desc: "Experience music like never before with our advanced Active Noise Cancellation (ANC) technology. Immerse yourself in crystal-clear audio, as the headphones intelligently detect and cancel out background noise, allowing you to focus on your favorite tracks or podcasts without any distractions.",
    largeText1: "fine",
    largeText2: "smile",
    saleTime: "14 Nov to 3 dec",
    discount: "20",
  };
};
