import React, { createContext, useState, useEffect } from "react";
import { collection, getDocs, where, query, orderBy } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import Loader from "../components/Loader";
import { getItems } from "../components/apiCrudRealTime";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promo, setpromo] = useState();
  const [otro, setotro] = useState();
  const [categoriesPromo, setCategoriesPromo] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getItems()
      .then((categorias) => {
        const promoCategories = categorias.filter(
          (item) =>
            item.hasOwnProperty("categoria") &&
            [
              "redondos",
              "cuadrados",
              "eye cat",
              "lectura",
              "infantiles",
            ].includes(item.categoria)
        );

        const otherCategories = categorias.filter(
          (item) =>
            item.hasOwnProperty("categoria") &&
            ![
              "redondos",
              "cuadrados",
              "eye cat",
              "lectura",
              "infantiles",
            ].includes(item.categoria)
        );
        console.log(promoCategories);
        console.log(otherCategories);
        setCategoriesPromo(promoCategories);
        setCategories(otherCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      const queryRef = query(
        itemsCollection,
        where("estado", "==", "activo"),
        orderBy("titulo")
      );
      const querySnapshot = await getDocs(queryRef);
      const productos = querySnapshot.docs.map((doc) => {
        console.log("gaste una lectura desde el front");
        return { id: doc.id, ...doc.data() };
      });
      setItems(productos);
      setIsLoading(false);
    };
  
    loadProducts();
  }, []);
  useEffect(() => {
    getItems()
      .then((categorias) => {
        const promo = categorias.filter((item) => item.nombre === "promo");
        const otro = categorias.filter((item) => item.nombre === "otro");
        setpromo(promo[0].datos.url);
        setotro(otro[0].datos.url);
      })
      .catch((error) => {
        console.log(error);
      });
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
        items,
        promo,
        otro,
        categoriesPromo,
        categories
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

