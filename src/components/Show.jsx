import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import Swal from "sweetalert2";
import Edit from "./Edit";
import Create from "./Create";
import { storage } from "../firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import Login from "./Login";
import Categorias from "./Categorias";

const Show = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const productsCollection = collection(dataBase, "items");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productos = snapshot.docs.map((doc) => {
        console.log("leo desde admin");
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      const productosOrdenados = productos.sort((a, b) => {
        if (a.categoria === b.categoria) {
          return a.titulo.localeCompare(b.titulo);
        }
        return a.categoria.localeCompare(b.categoria);
      });
      setProducts(productosOrdenados);
    });
  
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);
  

  useEffect(() => {
    const productosFiltrados = products.filter((producto) => {
      return producto.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredProducts(productosFiltrados);
  }, [products, searchTerm]);

  const deleteProduct = async (id) => {
    const productDoc = doc(dataBase, "items", id);
    const productSnapshot = await getDoc(productDoc);
    const productImagenes = productSnapshot.data().imagenes;
    productImagenes.map((img) => borrarImagen(img.name));
    await deleteDoc(productDoc);
    console.log(productDoc);
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
        <></>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="d-flex flex-column justify-content-around flex-md-row text-center mb-2">
                <Create className="col-6 col-md-4 "></Create>
                <Categorias className="col-6 col-md-2 "></Categorias>
                <input
                  className="col-12 col-md-6 ps-2 ms-md-3"
                  type="text"
                  placeholder="Buscar productos"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="row cuadro" key="titles">
                <div className="col-2 mx-0 px0">Categoría</div>
                <div className="col-6 col-md-2 mx-0 px0">Título</div>
                <div className="col-2 mx-0 px0">Proveedor</div>
                <div className="col-2 mx-0 px0">Descripción</div>
                <div className="col-2 mx-0 px0">Stock</div>
                <div className="col-2 mx-0 px0">Editar/Borrar</div>
              </div>
              {filteredProducts.map((product) => (
                <div className="row cuadro" key={product.id}>
                  <div className="col-2 mx-0 px0">{product.categoria}</div>
                  <div className="col-6 col-md-2 mx-0 px0">
                    {product.titulo}
                  </div>
                  <div className="col-2  mx-0 px0">{product.proveedor}</div>
                  <div
                    className="col-2 descripcion"
                    dangerouslySetInnerHTML={{ __html: product.descripcion }}
                  />

                  <div className="col-2  mx-0 px0">{product.stock}</div>
                  <div className="d-flex col-2 mx-0 px0">
                    <Edit id={product.id}></Edit>
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
