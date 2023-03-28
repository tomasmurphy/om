import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ItemList } from './ItemList';
import Seo from './Head';
import { CartContext } from '../context/CartContext';

const ItemListContainer = () => {
    window.scrollTo(0, 0)
    const { nombreCategoria } = useParams()
    const cartContext = useContext(CartContext);
    const {items} = cartContext


    // useEffect(() => {
    //     const loadItems = async () => {
    //         const itemsCollection = collection(dataBase, 'items');
    //         const querySnapshot = await getDocs(itemsCollection);
    //         const productos = querySnapshot.docs.map((doc) => {
    //             console.log("gaste una lectura desde el front")
    //             return {
    //                 id: doc.id,
    //                 ...doc.data()
    //             }
    //         });
    //         const productosFiltrados = productos.filter((p) => p.stock > 0 && p.imagenes.length > 0);
    //         const productosOrdenados = [...productosFiltrados].sort((a, b) => (a.precio > b.precio ? 1 : a.precio < b.precio ? -1 : 0));
    //         setItems(productosOrdenados);
    //         setIsLoading(false);
    //     };
    
    //     loadItems();
    // }, []);

    const productosCategoria = nombreCategoria !== "todos" ?
        items.filter((p) => p.categoria === nombreCategoria) :
        items;

    return (
        <>
            <Seo
                title={"Catálogo"}
                description={"Recetados, Sol, Contactología"}
                image={`${window.location.origin}%PUBLIC_URL%/logoVioleta.jpg`}
                pathSlug={window.location.href}
            />
            <div className='item row'>
                <ItemList items={productosCategoria} />
            </div>
        </>
    );
};

export default ItemListContainer;
