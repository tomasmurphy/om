import Cart from "./Cart";
import React, { useState } from 'react';

const BtnCart = () => {
    const [showCart, setShowCart] = useState(false);

  const handleCartModal = () => {
    setShowCart(!showCart);
  };
    return (
        <><button onClick={handleCartModal}>Mostrar/ocultar carrito</button>
    <Cart show={showCart} handleModal={handleCartModal} />
    </>)
}

export default BtnCart