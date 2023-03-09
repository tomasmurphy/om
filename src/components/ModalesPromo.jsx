import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import mercadoPago from '../img/mercadoPago.svg'

const ModalesPromo = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  // eslint-disable-next-line no-restricted-globals
  let celu = screen.width < 990 ? "api" : "web";

  const whatsapp = "Hola *Optimarket OK!* 👓 Necesito asesoramiento acerca de: "
  let linkCompra = `https://${celu}.whatsapp.com/send?phone=5493774411192&text=${whatsapp}`;
  const enviarWhat = () => {
  window.open(linkCompra, '_blank')
  }

  return (
    <>
      <div className="btnCant" onClick={handleShow}>
              <i className={props.classPromo}></i>
              <p>{props.tituloPromo}</p>
        </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop={true}
        keyboard={false}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {props.tituloPromo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
       {(props.tituloPromo=== "Todos los medios de pago") ?<div>
       <div><i className="bi bi-credit-card-2-back"></i> Tarjeta de crédito</div>
       <div><i className="bi bi-credit-card"></i> Débito</div>
       <div><i className="bi bi-bank"></i> Transferencia</div>
       <div><i className="bi bi-currency-dollar"></i> Efectivo</div>
       <div><img src={mercadoPago} alt="mercado pago icon" className="mx-0 px-0" width="15" /> Mercado Pago</div>
        </div>:""}
        
        
        {(props.tituloPromo=== "Envíos a todo el país!") ?<div>
        
            <p><i className="bi bi-box"></i> Lo podés recibir en tu domicilio o en la sucursal de correo argentino mas cercana!</p>
        </div>   :""}

{(props.tituloPromo=== "Asesoramiento personalizado") ?
<div className="d-flex align-items-center flex-column">
            <p>Escibinos tu consulta y te asesoramos al instante </p>
            <div className='boton me-md-2 btnWhat' onClick={() => {
   enviarWhat();
    
  }}>Consultar <i className="bi bi-whatsapp"></i></div>
        </div>
        :""}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalesPromo;
