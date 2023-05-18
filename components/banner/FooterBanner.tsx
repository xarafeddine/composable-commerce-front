import Image from "next/image";
import Link from "next/link";
interface props {
  footerBanner: any;
}
const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}: props) => {
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}% OFF</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <div className="w-28">
            <p>{desc.slice(0, 20)}</p>
          </div>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <Image
          width={500}
          height={500}
          src={image}
          className="footer-banner-image"
          alt={""}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
