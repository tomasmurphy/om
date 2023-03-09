import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import Modal from "react-bootstrap/Modal";
import ImagenUpload from "./ImageUpload";
import { Editor } from "./MostrarImagen";
import SelectCategoria from "./SelectCategoria";

const Create = ({ getProducts }) => {
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [status, setStatus] = useState(true);
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(1);
  const [imagenes, setImagenes] = useState([]);
  const global = "Recetados"
  const productsCollection = collection(dataBase, "items");

  const subirImagenes = (img, borrar) => {
    if (borrar === 1) {
      const borrarUnaImagen = imagenes.filter((imagen) => imagen.name !== img);
      console.log(borrarUnaImagen);
      setImagenes(borrarUnaImagen);
    } else {
      setImagenes([...imagenes, img]);
    }
    
  };
  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, {
      categoria: categoria,
      titulo: titulo,
      descripcion: descripcion,
      global: global,
      stock: stock,
      imagenes: imagenes,
      status: status,
    });
    setCategoria("");
    setDescripcion("");
    setTitulo("");
    setImagenes([]);
    setStatus(true);
    setStock(1);
    getProducts();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const cargarDescripcion = (descripcion) => {
  setDescripcion(descripcion)
  }
  const handleDescripcionChange = (value) => {
    setDescripcion(value);
    cargarDescripcion(value);
  };

  const cargarCategoria = (categoria) => {
    setCategoria(categoria)
    }
    const handleCategoriaChange = (value) => {
      setCategoria(value);
      cargarCategoria(value);
    };
  
  
  return (
    <>
      <div className="boton" onClick={handleShow}>
        Cargar nuevo producto
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cargar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="mb-3 row cajaUpload">
                  <div className="col-4 text-center ">
                    <ImagenUpload
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  </div>
                  <div className="col-4 text-center">
                    <ImagenUpload
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  </div>
                  <div className="col-4 text-center">
                    <ImagenUpload
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  </div>{" "}
                </div>
                <form onSubmit={store} className="row">
                  <div className="mb-3 col-12">
                    <label className="form-label">Categoria</label>
                    <SelectCategoria categoria={categoria} cargarCategoria={handleCategoriaChange} />
                  </div>
                  <div className="mb-3 col-12">
                    <label className="form-label">Titulo</label>
                    <input
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descripcion</label>
                    <Editor descripcion={descripcion} cargarDescripcion={handleDescripcionChange}></Editor>
                  </div>
                  <div className="mb-3 col-4 col-md-2">
                    <label className="form-label">Stock</label>
                    <input
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      type="number"
                      className="form-control text-center"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={handleClose}
                    className="btn btn-primary"
                  >
                    Crear
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Create;
