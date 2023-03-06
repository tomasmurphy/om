import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dataBase } from '../firebaseConfig';
import { getDoc, doc, collection } from 'firebase/firestore';
import { ItemDetail } from './ItemDetail';
import Loader from './Loader';


const ItemDetailContent = (props) => {
    window.scrollTo(0, 0)
    const { handleCartModal } = props;

    const onHandleCartModal = () => {
      handleCartModal();
    };
    const [itemDetail, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { idProducto } = useParams()
    
    useEffect(() => {
        const itemsCollection = collection(dataBase, 'items');
        const ref = doc(itemsCollection, idProducto);
        getDoc(ref)
            .then((res) => {
                setItem({
                    id: res.id,
                    ...res.data()
                });
                setIsLoading(false)
            });
    }, [idProducto]);

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