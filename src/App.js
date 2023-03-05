import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
    const helmetContext = {};

    return (
        <HelmetProvider context={helmetContext}>
        <CartProvider>
            <BrowserRouter>
                <Main />               
            </BrowserRouter>
        </CartProvider>
        </HelmetProvider>
    );
};


export default App;