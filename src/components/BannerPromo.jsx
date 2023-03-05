import React from "react";
import Carousel from "./Carousel";

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
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
      },
    },
  ],
};

const BannerPromo = () => {
  return (
    <>
      <section className="pad bannerPromo item">
        <div className="row">
          <Carousel settings={settings}>
            <div>
              <i className="bi bi-credit-card-2-back"></i>
              <p>Todos los medios de pago!</p>
            </div>
            <div>
              {" "}
              <i className="bi bi-truck"></i>
              <p>Envíos a todo el país!</p>
            </div>
            <div>
              <i className="bi bi-person-check"></i>
              <p>Asesoramiento personalizado</p>
            </div>
            <div>
              <i className="bi bi-credit-card-2-back"></i>
              <p>Todos los medios de pago!</p>
            </div>
            <div>
              {" "}
              <i className="bi bi-truck"></i>
              <p>Envíos a todo el país!</p>
            </div>
            <div>
              <i className="bi bi-person-check"></i>
              <p>Asesoramiento personalizado</p>
            </div>
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default BannerPromo;
