import { useEffect, useState } from "react";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { dataBase } from "../firebaseConfig";
import Modal from "react-bootstrap/Modal";
import ImagenUpload from "./ImageUpload";
import SelectCategoria from "./SelectCategoria";

const Edit = ({ id  }) => {
  const [categoria, setCategoria] = useState("");
  const [titulo, setTitulo] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [medidas, setMedidas] = useState({ ancho: "", alto: "", patilla: "" });
  const [imagenes, setImagenes] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [stock, setStock] = useState(0);

  const subirImagenes = (img, borrar) => {
    if (borrar === 1) {
      const borrarUnaImagen = imagenes.filter((imagen) => imagen.name !== img);
      console.log(borrarUnaImagen);
      setImagenes(borrarUnaImagen);
    } else {
      setImagenes([...imagenes, img]);
    }
  };
  const update = async (e) => {
    e.preventDefault();
    const product = doc(dataBase, "items", id);
    const data = {
      categoria: categoria,
      titulo: titulo,
      descripcion: descripcion,
      proveedor: proveedor,
      medidas: medidas,
      imagenes: imagenes,
      stock: stock,
      estado: imagenes.length === 0 || stock === 0 ? "pausado" : "activo"
    };
    await updateDoc(product, data);
    
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(dataBase, "items", id));

    if (product.exists()) {
      setCategoria(product.data().categoria);
      setTitulo(product.data().titulo);
      setDescripcion(product.data().descripcion);
      setImagenes(product.data().imagenes);
      setProveedor(product.data().proveedor);
      setMedidas(product.data().medidas);
      setStock(product.data().stock);
    } else {
      console.log("El producto no existe");
    }
  };

  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cargarCategoria = (categoria) => {
    setCategoria(categoria);
  };
  const handleCategoriaChange = (value) => {
    setCategoria(value);
    cargarCategoria(value);
  };
  return (
    <>
      <div className="" onClick={handleShow}>
        <i className="btnCant bi bi-pencil-square"></i>
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
                  {/* <div className="col-4 text-center ">
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
                  </div> */}
                </div>
                <form onSubmit={update} className="row">
                  <div className="mb-3 col-12 d-flex">
                    <label className="form-label col-4">Categoria</label>
                    <SelectCategoria
                      categoria={categoria}
                      cargarCategoria={handleCategoriaChange}
                    />
                  </div>
                  <div className="mb-3 col-12 d-flex">
                    <label className="form-label col-4">Titulo</label>
                    <input
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-12 d-flex">
                    <label className="form-label col-4">Descripcion</label>
                    <input
                      value={descripcion}
                      onChange={(e) => setDescripcion(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-12 d-flex">
                    <label className="form-label col-4">Proveedor</label>
                    <input
                      value={proveedor}
                      onChange={(e) => setProveedor(e.target.value)}
                      type="text"
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3 col-12 col-md-4 text-center">
                    <label className="form-label">Stock</label>
                    <div className="input-group">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setStock(stock - 1)}
                      >
                        -
                      </button>
                      <input
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        type="number"
                        className="form-control text-center"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={() => setStock(stock + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-0 col-md-2"></div>
                  <div className="mb-3 col-4 col-md-2 text-center">
                    <label className="form-label">Ancho</label>
                    <input
                      value={medidas.ancho}
                      onChange={(e) =>
                        setMedidas({ ...medidas, ancho: e.target.value })
                      }
                      type="number"
                      className="form-control text-center"
                    />
                  </div>
                  <div className="mb-3 col-4 col-md-2 text-center">
                    <label className="form-label">Alto</label>
                    <input
                      value={medidas.alto}
                      onChange={(e) =>
                        setMedidas({ ...medidas, alto: e.target.value })
                      }
                      type="number"
                      className="form-control text-center"
                    />
                  </div>
                  <div className="mb-3 col-4 col-md-2 text-center">
                    <label className="form-label">Patilla</label>
                    <input
                      value={medidas.patilla}
                      onChange={(e) =>
                        setMedidas({ ...medidas, patilla: e.target.value })
                      }
                      type="number"
                      className="form-control text-center"
                    />
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
