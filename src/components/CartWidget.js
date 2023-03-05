import React from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";


export const CartWidget = () => {
    const { totalCart } = useContext(CartContext);
    return (
        <>
            {(totalCart() === 0) 
            ? <i className="bi bi-whatsapp what btn"></i> 
            : (<i className="bi bi-whatsapp btn what whatColor"><span className="d-inline nroCart">Hola!</span></i>)
            }
        </>
    )
}