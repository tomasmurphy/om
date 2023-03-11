import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import Seo from "./Head";
import { getItems } from "./apiCrudRealTime";

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
// const img = (windowWidth > 700)?img1:img2
const img = (windowWidth > 700)?desktop:mobile
const widthBanner = (windowWidth > 700)?windowWidth/3:windowWidth

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
      ) 
      : 
<div className="promoHomeWrapper sinBorde">
<div  
style={{
        backgroundImage: `url('${img}')`,
        backgroundSize: "100% auto",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        height: `${widthBanner}px`
      }} 
      onLoad={onLoad}
      className="row promoHome sinBorde mb-5">
  <div className="col-1" >  
  <div className='bordeIzquierdo'> </div>  
  </div>
  <div className="col-1">  
  <div className='bordeGrisIzq col-1'></div>
  </div>
    
    <div className="col-1">  
  <div className='bordeGrisDer col-1'></div>
  </div>
  {/* <h1 className="textoBajo text-center"> {items[0].titulo} </h1> */}
  <Link to={`categoria/todos`}><h1 className="textoBajo text-center boton"> Ver todos los modelos! </h1></Link>
  
</div>
</div>
      }
    </>
  );
};

export default Home;
