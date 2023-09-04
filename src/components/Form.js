import React, { useState } from "react";
import Loader from './Loader';

const Form = ({ cart, handleModal, clearCart }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        const celu = window.innerWidth < 990 ? "api" : "web";
        
        // Construye el mensaje dependiendo de la longitud del carrito
        const mensaje = cart.map(prod => {
            let messageLine = `👓 ${prod.titulo}`;
            if (["redondos", "cuadrados", "lectura", "infantiles", "eye cat"].includes(prod.categoria)) {
                messageLine += " Promo!";
            }
            return messageLine;
        }).join("\n");

        const whatsapp = (cart.length === 0) ? "Hola *Optimarket OK!* 👓" : `Hola *Optimarket OK!*.\n_Me interesan estos marcos:_\n${mensaje}`;
        const linkCompra = `https://${celu}.whatsapp.com/send?phone=5493774411192&text=${encodeURIComponent(whatsapp)}`;

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
