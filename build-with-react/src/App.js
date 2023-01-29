import { Route, Routes } from 'react-router-dom';

import ProductList from './components/ProductList/ProductList';
import Checkout from './components/Checkout/Checkout';

import './App.css';

function App() {
    return (
        <div id='container'>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="/checkout" element={<Checkout />} />
            </Routes>
        </div>
    );
}

export default App;
