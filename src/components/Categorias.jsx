import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  getItems,
  updateItem,
  createItem,
  deleteItem,
} from "./apiCrudRealTime";
import Swal from "sweetalert2";

const Categorias = () => {
  const [show, setShow] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [updateCounter, setUpdateCounter] = useState(0); // Estado de contador

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      const items = await getItems();
      const categorias = items.filter((item) =>
        item.hasOwnProperty("categoria")
      );
      setCategorias(categorias);
    };
    fetchData();
  }, [updateCounter]); // Dependencia: updateCounter

  const handleCategoriaChange = (event, id) => {
    const updatedCategorias = categorias.map((cat) => {
      if (cat.id === id) {
        return { ...cat, categoria: event.target.value };
      } else {
        return cat;
      }
    });
    setCategorias(updatedCategorias);
  };

  const handleUpdateCategoria = async (id) => {
    const categoriaToUpdate = categorias.find((cat) => cat.id === id);
    const updatedCategoria = { categoria: categoriaToUpdate.categoria };
    Swal.fire({
      title: "¿Estás seguro de actualizar la categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await updateItem(id, updatedCategoria);
        Swal.fire({
          title: "Categoría actualizada con éxito",
          icon: "success",
        });
        const cat = await getItems();
        setCategorias(cat);
        setNuevaCategoria("");
        setUpdateCounter((prevCounter) => prevCounter + 1); // Incrementar el contador
      }
    });
  };

  const handleDeleteCategoria = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar la categoría?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteItem(id);
        const cat = await getItems();
        setCategorias(cat);
        setNuevaCategoria("");
        setUpdateCounter((prevCounter) => prevCounter + 1); // Incrementar el contador
        Swal.fire({
          title: "Categoría eliminada con éxito",
          icon: "success",
        });
      }
    });
  };

  return (
    <>
      <div className="boton" onClick={handleShow}>
        Categorias
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
          <Modal.Title>Categorias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            {categorias.map((cat) => (
              <div className="d-flex" key={cat.id}>
                <input
                  type="text"
                  className="ps-1"
                  value={cat.categoria}
                  onChange={(event) => handleCategoriaChange(event, cat.id)}
                />
                <div
                  className="btnCat"
                  onClick={() => handleUpdateCategoria(cat.id)}
                >
                  <i className="btnCant bi bi-pencil-square"></i>
                </div>
                <div
                  className="btnCat"
                  onClick={() => handleDeleteCategoria(cat.id)}
                >
                  <i className=" btnCant bi bi-trash3"></i>
                </div>
              </div>
            ))}
            <div className="d-flex">
              <input
                type="text"
                className="ps-1"
                value={nuevaCategoria}
                placeholder="Nueva"
                onChange={(event) => setNuevaCategoria(event.target.value)}
              />
              <div
                className="btnCant"
                onClick={async () => {
                  await createItem({ categoria: nuevaCategoria });
                  const cat = await getItems();
                  setCategorias(cat);
                  handleClose();
                  setNuevaCategoria("");
                  Swal.fire({
                    title: "Categoría creada con éxito",
                    icon: "success",
                  });
                  setUpdateCounter((prevCounter) => prevCounter + 1); // Incrementar el contador
                }}
              >
                <i
                  style={{
                    color: "green",
                  }}
                  className=" bi bi-check-square-fill"
                ></i>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Categorias;
