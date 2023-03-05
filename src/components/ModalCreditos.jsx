import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

function ModalCreditos() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <p className="pModal" onClick={handleShow}>
                + info
            </p>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered            >
                <Modal.Header closeButton>
                    <Modal.Title>CRÉDITOS PERSONALES</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>Por el crédito personal tenes que llamar a casa central 😉 
</p>
<p>Tel: 011 7535-3509 👍</p>
<p>Lunes a sábado de 9 a 12:30 y de 16:30 a 20 🤗
</p>                 </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalCreditos;