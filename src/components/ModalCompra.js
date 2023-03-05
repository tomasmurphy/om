import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Form from "./Form";

function ModalCompra({ cart, total, clearCart, handleId }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='boton'  onClick={handleShow}>
                Comprar
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size= "md"
                style={{ 
                    borderRadius: "0",
                 }}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Finalizar compra</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form cart={cart}
                        total={total}
                        clearCart={clearCart}
                        handleId={handleId}></Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalCompra;