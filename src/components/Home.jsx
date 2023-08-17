import React, { useState, useEffect, useContext } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Seo from "./Head";
import { getItems } from "./apiCrudRealTime";
import { CartContext } from '../context/CartContext';

const Home = () => {
  window.scrollTo(0, 0);
  const [isLoading, setIsLoading] = useState(true);
  const [desktop, setDesktop] = useState();
  const [mobile, setMobile] = useState();
  
  const onLoad = () => {
    setIsLoading(false);
  };
  
  useEffect(() => {
    getItems()
      .then((categorias) => {
        const desktop = categorias.filter(item => item.nombre === "desktop");
        const mobile = categorias.filter(item => item.nombre === "mobile");
        setDesktop(desktop[0].datos.url);
        setMobile(mobile[0].datos.url);
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [categories, setCategories] = useState([]);
    
  useEffect(() => {
    getItems().then((categorias) => {
      const filtro = categorias.filter(item => item.hasOwnProperty("categoria"));
      setCategories(filtro);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const cartContext = useContext(CartContext);
  const { items } = cartContext;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const img = windowWidth > 700 ? desktop : mobile;
  // const widthBanner = windowWidth > 700 ? windowWidth / 3 : windowWidth;

  const handleScrollToLinks = (event) => {
    event.preventDefault();
    const linksSection = document.getElementById("links");
    const offset = 64;
    const offsetTop = linksSection.offsetTop - offset;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Seo
        title={"Optimarket OK"}
        description={"Recetados, Sol, lentes de contacto"}
        image={`${window.location.origin}/static/media/LogoNuevo.c219d0bf4f0348ebfdc3.png`}
        pathSlug={window.location.href}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="promoHomeWrapper sinBorde">
          <img src={img} className="img-fluid" alt="banner" />
          <div
            
            onLoad={onLoad}
            className="row promoHome bordeBot sinBorde"
          >
            
            <a href="#links" onClick={handleScrollToLinks}>
              <h1 className="textoBajo2 text-center"> ↧ </h1>
            </a>
          </div>
        </div>
      )}
      <div id="links" className="row">
        {categories.map((cat) => (
          <div key={cat.id} className="col-6 col-md-4">
            <Link to={`/categoria/${cat.categoria}`} className="  row promoHome">
              <div className="sombraCat">
                <img
                  onLoad={onLoad}
                  src={items.find(item => item.categoria === cat.categoria).imagenes[0].url}
                  alt="promo"
                  className="col-12 img-fluid  fondoGris"
                />
                <h1 className="textoBajo text-center"> {cat.categoria} </h1>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
