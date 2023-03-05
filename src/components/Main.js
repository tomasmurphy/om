import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ItemListContainer from '../components/ItemListContainer';
import ItemDetailContent from './ItemDetailContent';
import Home from './Home'
import Show from './Show'
import NavMenu from './NavMenu';
import Nav from './Nav';
import BannerPromo from './BannerPromo';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';

const Main = () => {
    const location = useLocation().pathname
    const [showCart, setShowCart] = useState(false);

    const handleCartModal = () => {
        setShowCart(!showCart);
    };

    return (
        <>
            {(location !== "/admin") ?
                <>
                    <Nav handleCartModal={handleCartModal} />
                    <NavMenu></NavMenu>
                    <Cart show={showCart} handleModal={handleCartModal}></Cart>
                    <div className="container-fluid sinBorde">
                        <Routes >
                            <Route path='/' element={<Home />} />
                            <Route path='/categoria/' element={<ItemListContainer />} />
                            <Route path='/categoria/:nombreCategoria' element={<ItemListContainer />} />
                            <Route path='/detalle/:idProducto' element={<ItemDetailContent handleCartModal={handleCartModal} />} />
                            <Route path='/admin' element={<Show />} />
                        </Routes>
                    </div>
                    <BannerPromo></BannerPromo>
                </>
                : <div className="container-fluid">
                    <Routes >
                        <Route path='/' element={<Home />} />
                        <Route path='/categoria/' element={<ItemListContainer />} />
                        <Route path='/categoria/:nombreCategoria' element={<ItemListContainer />} />
                        <Route path='/detalle/:idProducto' element={<ItemDetailContent />} />
                        <Route path='/admin' element={<Show />} />
                    </Routes>
                </div>}
        </>
    );
};

export default Main;
