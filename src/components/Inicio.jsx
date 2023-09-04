import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ImgBanner from './ImgBanner'

const Inicio = () => {
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  return (
    <>
      <div className="boton" onClick={handleShow}>
        Banner
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
          <Modal.Title>Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
          <div>
          <ImgBanner nombre="promo"/>
                <ImgBanner nombre="otro"/>
                </div>
                
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Inicio;
