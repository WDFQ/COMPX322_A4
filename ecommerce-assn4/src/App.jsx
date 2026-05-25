import { Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { ProductsPage } from './pages/ProductsPage'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductsPage />}></Route>
                <Route path="/cart" element={<CartPage />}></Route>
            </Routes>
        </>
    )
}

export default App
