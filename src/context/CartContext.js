import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import Loader from "../components/Loader";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = (item) => {
    if (isInCart(item.id)) {
      sumarCantidad(item);
    } else {
      setCart([...cart, { ...item }]);
    }
  };

  const isInCart = (id) => {
    return cart.some((producto) => producto.id === id);
  };

  const sumarCantidad = (item, cantidad, formaPago) => {
    const cartActualizado = cart.map((producto) => {
      if (producto.id === item.id) {
        const productoActualizado = {
          ...producto,
          cantidad: cantidad,
          formaPago: formaPago,
        };
        return productoActualizado;
      } else {
        return producto;
      }
    });
    setCart(cartActualizado);
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearProducto = (id) => {
    const cartFiltrado = cart.filter((producto) => producto.id !== id);
    setCart(cartFiltrado);
  };

  const totalCart = () => {
    const copyCart = [...cart];
    let acumulador = 0;
    copyCart.forEach((producto) => {
      acumulador += producto.cantidad;
    });
    return acumulador;
  };

  const totalPrecio = () => {
    const copyCart = [...cart];
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

  useEffect(() => {
    const loadProducts = async () => {
      const itemsCollection = collection(dataBase, "items");
      const querySnapshot = await getDocs(itemsCollection);
      const productos = querySnapshot.docs.map((doc) => {
        console.log("gaste una lectura desde el front");
        return { id: doc.id, ...doc.data() };
      });
      const productosFiltrados = productos.filter(
        (p) => p.stock > 0 && p.imagenes.length > 0
      );
      const productosOrdenados = [...productosFiltrados].sort(
        (a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0)
      );
      setItems(productosOrdenados);
      setIsLoading(false);
    };

    loadProducts();
  }, []);

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
        handleModal,
        items
      }}
    >
      {isLoading ? (
        <div className="loader-container">
          <div className="loader">
            <h3 className='text-center mt-5'>Cargando el catálogo</h3>
          <Loader />
          </div>
        </div>
      ) : (
        children
      )}
    </CartContext.Provider>
      );
    };