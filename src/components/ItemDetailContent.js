import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ItemDetail } from './ItemDetail';
import Loader from './Loader';
import { CartContext } from '../context/CartContext';

const ItemDetailContent = (props) => {
    window.scrollTo(0, 0)
    const { handleCartModal } = props;

    const onHandleCartModal = () => {
      handleCartModal();
    };

    const [itemDetail, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const { idProducto } = useParams();

    // Obtiene el valor del arreglo items desde el contexto CartContext
    const { items } = useContext(CartContext);

    useEffect(() => {
        const foundItem = items.find(item => item.id === idProducto); // Busca el item correspondiente en el arreglo
        setItem(foundItem);
        setIsLoading(false);
    }, [idProducto, items]);

    return (
        <>
            {isLoading
                ? (<Loader></Loader>)
                : (
                    <div className='detalle pe-md-3 ps-md-3'>
                        <ItemDetail onHandleCartModal={onHandleCartModal} itemDetail={itemDetail} />
                    </div>
                )
            }
        </>
    );
};

export default ItemDetailContent;
