import img1 from "../../Img_user/crousel1.jpg";
import img2 from "../../Img_user/crousel2.png";
import img3 from "../../Img_user/sale.png";
import bg_crousel from "../../Img_user/crousel_bg.jpg";
import Implement from "./Imple_Carousel";

export default function ImageCarou() {
  const slides = [img3, img1, img2];
  return (
    <>
      <div
        className=" bg-opacity-30  bg-cover bg-center p-16 "
        style={{ backgroundImage: `url(${bg_crousel})` }}
      >
        <div className="max-w-screen-xl overflow-hidden rounded-lg mx-auto shadow-lg  shadow-black  z-10  ">
          <Implement
            slides={slides}
            autoSlide={true}
            autoSlideInterval={2000}
          />
        </div>
      </div>
    </>
  );
}
