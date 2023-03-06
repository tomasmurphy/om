import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext';
import ItemCount from './ItemCount';
import Carousel from './Carousel';
import Seo from './Head';

export const ItemDetail = ({ itemDetail, onHandleCartModal }) => {
  const { addToCart, cantidadSeleccionada } = useContext(CartContext)

  const onAdd = (cantidad) => {
    onHandleCartModal()
    addToCart(itemDetail);
    
  };
  const cantidadEnCart = cantidadSeleccionada(itemDetail.id);
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
          arrows:false,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };


  return (
    <>
      <Seo title={itemDetail.titulo}
        description={itemDetail.precio}
        image={`${itemDetail.imagenes[0].url}`}
        pathSlug={window.location.href}
      />

      <div className='row'>
        <div className="card col-12 col-md-6 ps-md-5 pe-md-5 mt-md-3" key={itemDetail.id}>

          <Carousel settings={settings}>
            {itemDetail.imagenes.map(img =>
              <div key={itemDetail.id}><img src={img.url} alt={itemDetail.titulo} className="img-fluid" /></div>
            )}
          </Carousel>
        </div>
        <div className="card pe-3 ps-3 datos mt-3 col-12 col-md-6">
          <div>
            <h1>{itemDetail.titulo}</h1>
            <h4 className='gris'>{itemDetail.categoria} / stock:{itemDetail.stock}  </h4>  
          </div>
          <div className='mt-3' dangerouslySetInnerHTML={{ __html: itemDetail.descripcion }} />
          
            
          <div className='mt-3'>   
          
          
          <h4 ><i className="bi bi-credit-card-2-back me-2"></i>Todos los medios de pago </h4>

            <h4><i className="bi bi-truck me-2"></i>Envíos a todo el país!</h4>
            <h4><i className="bi bi-person-check me-2"></i>Asesoramiento personalizado</h4>
            
            
          </div>
          
          <h4 className='text-center text-md-start mt-3'><ItemCount stock={itemDetail.stock} initial={(cantidadEnCart === undefined) ? 1 : cantidadEnCart} onAdd={onAdd} />
          </h4>
        </div>
      </div>
    </>)

}
