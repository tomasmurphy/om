import Main from './components/Main';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    const helmetContext = {};

    return (
        <HelmetProvider context={helmetContext}>
            <BrowserRouter>
                <Main />               
            </BrowserRouter>
        </HelmetProvider>
    );
};


export default App;