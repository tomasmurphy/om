import React from "react";
import Carousel from "./Carousel";
import ModalesPromo from "./ModalesPromo";
const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: false,
  autoplaySpeed: 2000,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 678,
      settings: {
        dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "linear",
      },
    },
  ],
};


const BannerPromo = (props) => {
  return (
    <>
      <section className="pad bannerPromo item">
        <div className="row">
          <Carousel settings={settings}>
            <ModalesPromo 
            classPromo="bi bi-credit-card-2-back"
            tituloPromo="Todos los medios de pago" />
            
            <ModalesPromo 
            classPromo="bi bi-truck"
            tituloPromo="Envíos a todo el país!" />
            
            <ModalesPromo 
            classPromo="bi bi-person-check"
            tituloPromo="Asesoramiento personalizado"
            handleCartModal={props.handleCartModal} />
            
            
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default BannerPromo;
