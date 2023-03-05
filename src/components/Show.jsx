import React, { useState, useEffect } from "react";
import {
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import Swal from "sweetalert2";
import Edit from "./Edit";
import Create from "./Create";
import { storage } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import Login from "./Login";
import StockControl from "./StockControl";
const Show = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const productsCollection = collection(dataBase, "items");
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getProducts = async () => {
    const data = await getDocs(productsCollection);
    const productos = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const productosOrdenados = productos.sort((a, b) => (a.titulo > b.titulo) ? 1 : -1);
    setProducts(productosOrdenados);
    setFilteredProducts(productosOrdenados);
  };
  
  const filterProducts = (productos, searchTerm) => {
    return productos.filter((producto) => {
      return producto.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const productosFiltrados = filterProducts(products, searchTerm);
    setFilteredProducts(productosFiltrados);
  }, [products, searchTerm]);

  const deleteProduct = async (id) => {
    const productDoc = doc(dataBase, "items", id);
    const productSnapshot = await getDoc(productDoc); // Obtener el documento correspondiente
    const productImagenes = productSnapshot.data().imagenes;
    productImagenes.map((img) => borrarImagen(img.name));
    await deleteDoc(productDoc);
    console.log(productDoc);
    getProducts();
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: "¿Eliminar el producto?",
      text: "Esta accion no es reversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Si, borralo pá!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //llamamos a la fcion para eliminar
        deleteProduct(id);
        Swal.fire("Borrado!", "Chau tu producto", "success");
      }
    });
  };
  const borrarImagen = (img) => {
    const desertRef = ref(storage, `/files/${img}`);
    deleteObject(desertRef)
      .then(() => {
        console.log("te borre");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLoginSuccess = (isLogin) => {
    setLoggedIn(isLogin);
  };
  
  return (
    <>
    <Login onLoginSuccess={handleLoginSuccess}></Login>
      {loggedIn ? (
        <> 
         
        </>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="d-flex flex-column flex-md-row text-center mb-2">
                <Create className="col-12 col-md-4 " getProducts={getProducts}></Create>
                <input className="col-12 col-md-8 ps-2 ms-md-3" type="text" placeholder="Buscar productos" value={searchTerm} onChange={handleSearchChange} />

              </div>
              
              {filteredProducts.map((product) => (
                <div className="row cuadro" key={product.id}>
                  <div className="col-6 mx-0 px0">{product.titulo}</div>
                  <div className="col-4 mx-0 px0">
                                      <StockControl id={product.id}
                      getProducts={getProducts}></StockControl>
                  </div>
                  <div className="d-flex col-2 mx-0 px0">
                    <Edit
                      id={product.id}
                      getProducts={getProducts}
                    ></Edit>
                    <div>
                    <i
                      onClick={() => {
                        confirmDelete(product.id);
                      }}
                      className=" btnCant bi bi-trash3"
                    ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Show;
