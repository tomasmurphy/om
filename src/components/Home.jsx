import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Seo from "./Head";
import { CartContext } from "../context/CartContext";

const Home = () => {
  window.scrollTo(0, 0);
  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const { promo } = cartContext;
  const { otro } = cartContext;
  const { categoriesPromo } = cartContext;
  const { categories } = cartContext;

  return (
    <>
      <Seo
        title={"Optimarket OK"}
        description={"Recetados, Sol, lentes de contacto"}
        image={`${window.location.origin}/static/media/LogoNuevo.c219d0bf4f0348ebfdc3.png`}
        pathSlug={window.location.href}
      />

      <div className="nuevoHome container-fluid sinBorde ">
        <div className="row promo mt-3">
          <div className="promoCartel col-12 col-md-4">
            <img src={promo} alt="" className="img-fluid" />
          </div>

          <div className=" col-12 col-md-8">
            <div id="links" className="botones row">
              {categoriesPromo.map((cat) => (
                <div key={cat.id} className="col-6 col-md-4">
                  <Link
                    to={`/categoria/${cat.categoria}`}
                    className="  row promoHome"
                  >
                    <div className="sombraCat">
                      <img
                        src={
                          items.find((item) => item.categoria === cat.categoria)
                            .imagenes[0].url
                        }
                        alt="promo"
                        className="col-12 img-fluid  fondoGris"
                      />
                      <h1 className="textoBajo text-center">
                        {" "}
                        {cat.categoria}{" "}
                      </h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row promo">
          <div className="promoCartel order-md-2 col-12 col-md-4">
            <img src={otro} alt="" className="img-fluid" />
          </div>

          <div className=" col-12 col-md-8 order-md-1">
            <div id="links" className="botones row">
              {categories.map((cat) => (
                <div key={cat.id} className="col-6 col-md-4">
                  <Link
                    to={`/categoria/${cat.categoria}`}
                    className="  row promoHome"
                  >
                    <div className="sombraCat">
                      <img
                        src={
                          items.find((item) => item.categoria === cat.categoria)
                            .imagenes[0].url
                        }
                        alt="promo"
                        className="col-12 img-fluid  fondoGris"
                      />
                      <h1 className="textoBajo text-center">
                        {" "}
                        {cat.categoria}{" "}
                      </h1>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
