import data from "../store/products.json";

export const getProducts = async () => {
  return data.products;
};

export const getBanner = async () => {
  return {
    smallText: "wireless",
    midText: "Beast solo",
    largeText: "HEADPHONE",
    image: "/images/banner_03.webp",
    product: "2",
    buttonText: "Shop wireless headphone",
    desc: "epum ifip avui a to heoll oc lill kil youc oiuem werou vociu newoviu enwkluovu weioun suos i io wou woivssao oo uoudsn.",
    largeText1: "fine",
    largeText2: "smile",
    saleTime: "14 Nov to 3 dec",
    discount: "20",
  };
};
