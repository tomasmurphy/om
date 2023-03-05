import React from "react";
import { Form } from "react-bootstrap";

const FormaPago = ({ formasPago, traerFormaPago }) => {
 
  const doce = formasPago[0];
  const seis = formasPago[1];
  const tres = formasPago[2]
  const personal = formasPago[3];
  const contado = formasPago[4];
  const noBancarias = formasPago[5]
  
  return (
    <>
      <Form.Select defaultValue={doce} onChange={() => traerFormaPago()}
      onInputChange={() => traerFormaPago()}
      id="select" aria-label="Default select">
        <option value={doce}>{doce}</option>
        <option value={seis}>{seis}</option>
        <option value={tres}>{tres}</option>
        <option value={personal}>{personal}</option>
        <option value={contado}>{contado}</option>
        <option value={noBancarias}>{noBancarias}</option>
      </Form.Select>
    </>
  );
};

export default FormaPago;
