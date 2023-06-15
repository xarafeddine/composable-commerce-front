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
    product2,
    buttonText,
    image2,
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
          <div className="w-[50%]">
            <p>the AcousticX Pro Wireless Headphones</p>
          </div>
          <Link href={`/product/${product2}`}>
            <button type="button">{buttonText}</button>
          </Link>
        </div>

        <Image
          width={500}
          height={500}
          src={image2}
          className="footer-banner-image"
          alt={""}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
