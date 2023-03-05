import { useEffect, useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import Modal from "react-bootstrap/Modal";
import ImagenUpload from "./ImageUpload";
import { Editor } from "./MostrarImagen";

const Edit = ({ id, getProducts, stockUpdate}) => {

  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [status, setStatus] = useState(true);
  const [descripcion, setDescripcion] = useState("");
  const subirImagenes = (img, borrar) => {
    if (borrar === 1) {
      const borrarUnaImagen = imagenes.filter((imagen) => imagen.name !== img);
      console.log(borrarUnaImagen);
      setImagenes(borrarUnaImagen);
    } else {
      setImagenes([...imagenes, img]);
    }
    console.log(imagenes);
  };

  const update = async (e) => {
    e.preventDefault();
    const product = doc(dataBase, "items", id);
    const data = {
      categoria: categoria,
      titulo: titulo,
      descripcion: descripcion,
      imagenes: imagenes,
      status: status,
    };
    await updateDoc(product, data);
    getProducts();
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(dataBase, "items", id));
    if (product.exists()) {
      setCategoria(product.data().categoria);
      setTitulo(product.data().titulo);
      setDescripcion(product.data().descripcion);
      setStatus(product.data().status);
      setImagenes(product.data().imagenes);
      console.log("soy recursiva")
    } else {
      console.log("El producto no existe");
    }
  };

  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line
  }, [stockUpdate]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [isChecked, setIsChecked] = useState(status);
  // const handleChange = () => {
  //   setIsChecked(!isChecked);
  //   setStatus(!isChecked);
  // };
  const cargarDescripcion = (descripcion) => {
    setDescripcion(descripcion)
      }
      const handleDescripcionChange = (value) => {
        setDescripcion(value);
        cargarDescripcion(value);
      };
  return (
    <>
      <div className="" onClick={handleShow}>
      <i className="btn bi bi-pencil-square"></i>
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
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col">
              <div className="mb-3 row cajaUpload">
                  <div className="col-4 text-center ">      
                  {imagenes[0] === undefined ? (
                    <ImagenUpload
                      updateFile={{ name: "", url: "" }}
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  ) : (
                    <ImagenUpload
                      updateFile={imagenes[0]}
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  )}
                  </div>
                  <div className="col-4 text-center ">
                  {imagenes[1] === undefined ? (
                    <ImagenUpload
                      updateFile={{ name: "", url: "" }}
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  ) : (
                    <ImagenUpload
                      updateFile={imagenes[1]}
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  )}
                  </div>
                  <div className="col-4 text-center ">
                  {imagenes[2] === undefined ? (
                    <ImagenUpload
                      updateFile={{ name: "", url: "" }}
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  ) : (
                    <ImagenUpload
                      updateFile={imagenes[2]}
                      subirImagenes={subirImagenes}
                    ></ImagenUpload>
                  )}
                  </div>
                </div>
                <form onSubmit={update} className="row">
                  <div className="mb-3 col-12">
                    <label className="form-label">Categoria</label>
                    <input
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value)}
                      type="text"
                      className="form-control"
                    />
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
                  <div className="mb-3 col-12">
                    <label className="form-label">Descripcion</label>
                    <Editor descripcion={descripcion} cargarDescripcion={handleDescripcionChange}></Editor>
                  </div>
                  <button
                    type="submit"
                    onClick={handleClose}
                    className="btn btn-primary"
                  >
                    Actualizar
                  </button>
                </form>
              </div>
            </div>
          </div>{" "}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Edit;
