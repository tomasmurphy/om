import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Seo from "./Head";

const Home = () => {
  window.scrollTo(0, 0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { nombreCategoria } = useParams();
  const [img1, setImg1] = useState();
  const [img2, setImg2] = useState();
  
  const onLoad = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const q = collection(dataBase, "items");

    getDocs(q)
      .then((res) => {
        const productos = res.docs.map((prod) => {
          return {
            id: prod.id,
            ...prod.data(),
          };
        });
        const productosOrdenados = productos.filter(product => product.categoria === "Promo")
        setItems(productosOrdenados);
        setImg1(productosOrdenados[0].imagenes[0].url)
        setImg2(productosOrdenados[0].imagenes[1].url)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [nombreCategoria]);

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
const img = (windowWidth > 700)?img1:img2
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
  <Link to={`/categoria`}><h1 className="textoBajo text-center boton"> Ver todos los modelos! </h1></Link>
  
</div>
</div>
      }
    </>
  );
};

export default Home;
