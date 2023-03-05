import React, { useState } from "react";
import Loader from './Loader';

const Form = ({ cart, handleModal, clearCart }) => {

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (event) => {
        // eslint-disable-next-line no-restricted-globals
        let celu = screen.width < 990 ? "api" : "web";
        let mensaje = ""


        setIsLoading(true)
        event.preventDefault();
        cart.map(prod =>
            mensaje += `👓 ${prod.titulo} / `
        )
        const whatsapp = (cart.length === 0)?"Hola *Optimarket OK!* 👓":`Hola *Optimarket OK!*. Me interesan estos marcos ${mensaje}`
        let linkCompra = `https://${celu}.whatsapp.com/send?phone=5491151063324&text=${whatsapp}`;

        clearCart();

        window.open(linkCompra, '_blank')
        handleModal()
        setIsLoading(false)
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