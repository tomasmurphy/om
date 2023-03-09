import React, { useState } from "react";
import Loader from './Loader';

const Form = ({ cart, handleModal, clearCart }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const celu = window.innerWidth < 990 ? "api" : "web";
        const mensaje = cart.reduce((acc, prod) => `${acc}👓 ${prod.titulo} / `, "");
        const whatsapp = (cart.length === 0) ? "Hola *Optimarket OK!* 👓" : `Hola *Optimarket OK!*. Me interesan estos marcos ${mensaje}`;
        const linkCompra = `https://${celu}.whatsapp.com/send?phone=5493774411192&text=${whatsapp}`;

        setIsLoading(true);

        window.open(linkCompra, '_blank');

        clearCart();
        handleModal();
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (<Loader></Loader>)
                : (<div className="">
                    <form className="form" action="" onSubmit={handleSubmit}>
                        <button className="boton btnWhat">Consultar <i className="bi bi-whatsapp"></i></button>
                    </form>
                </div>)}
        </>
    )
}

export default Form;
