import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addToCart = (item) => {
    if (isInCart(item.id)) {
      sumarCantidad(item);
    } else {
      setCart([...cart, { ...item }]);
    }
  };

    const isInCart = (id) => {
        return cart.some((producto) => producto.id === id);
    }

    const sumarCantidad = (item, cantidad, formaPago) => {
        const cartActualizado = cart.map((producto) => {
            if (producto.id === item.id) {
                const productoActualizado = {
                    ...producto,
                    cantidad: cantidad,
                    formaPago: formaPago
                }
                return productoActualizado
            } else {
                return producto
            }
        });
        setCart(cartActualizado)
    }

    const clearCart = () => {
        setCart([]);
    }

    const clearProducto = (id) => {
        const cartFiltrado = cart.filter((producto) => producto.id !== id)
        setCart(cartFiltrado)
    }

    const totalCart = () => {
        const copyCart = [...cart]
        let acumulador = 0;
        copyCart.forEach((producto) => {
            acumulador += producto.cantidad;
        });
        return acumulador;
    };

    const totalPrecio = () => {
        const copyCart = [...cart]
        let acumulador = 0;
        copyCart.forEach((producto) => {
            acumulador += producto.cantidad * producto.precio;
        });
        return acumulador;
    };

    const cantidadSeleccionada = (id) => {
        const producto = cart.find((prod) => prod.id === id);
        return producto?.cantidad;
    };
    
      const handleModal = () => {
        setShowModal(!showModal);
      };
    
      return (
        <CartContext.Provider
          value={{
            cart,
            addToCart,
            clearCart,
            clearProducto,
            totalCart,
            totalPrecio,
            cantidadSeleccionada,
            handleModal // Agregar handleModal como propiedad del objeto value
          }}
        >
          {children}
        </CartContext.Provider>
      );
    };