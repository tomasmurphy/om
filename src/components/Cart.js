import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from 'react-router-dom'
import Form from './Form'
import Modal from 'react-bootstrap/Modal';

const Cart = (props) => {
    const { cart, clearCart, clearProducto} = useContext(CartContext);

    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleModal}
                backdrop={true}
                keyboard={false}
                size="md"
                style={{
                    borderRadius: "0",
                }}

            >
                <Modal.Body>

                    <div className="cart mt-3">
                        {(cart.length === 0) ? <h1 className=''>No seleccionaste ningún modelo! Podes seleccionar el que mas te guste en AGREGAR PRODUCTOS o mandarnos directamente un mensaje en CONSULTAR!.</h1>
                            : <h1 className=''>  Productos seleccionados para consulta   </h1>}
                        <div>
                            {cart.map((producto) => (
                                <div key={producto.id}>
                                    <div>{producto.categoria}/{producto.titulo}
                                        <button className="btn" onClick={() => clearProducto(producto.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                    <hr />
                                </div>
                            ))}
                        </div>
                        <div className="botonera mt-4">
                            <Link to="/categoria" onClick={props.handleModal} className="boton">
                                {(cart.length === 0) ? "Agregar productos" : "Agregar mas productos"}
                            </Link>
                            <Form cart={cart}
                                handleModal={props.handleModal}
                                clearCart={clearCart}
                            ></Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Cart;
