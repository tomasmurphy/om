import React, { useState } from 'react';
import { useEffect } from 'react';

const ItemCount = ({ stock, onAdd, initial }) => {
    const [count, setCount] = useState(initial);
    useEffect(() => {
        setCount(initial);
    }, [initial]);


    return (
        <>
            <div count={count} id='agregarAlCarrito'>
                <div className='boton me-md-2 btnWhat' onClick={() => onAdd(count)}>Consultar <i className="bi bi-whatsapp"></i></div>
            </div>

        </>
    );
};

export default ItemCount;