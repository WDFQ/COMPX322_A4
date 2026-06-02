import { Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { ProductsPage } from './pages/ProductsPage'
import { NavBar } from './components/Navbar'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { useState } from 'react'
import { CartContext } from './context/CartContext'

function App() {
    const [cart, setCart] = useState([])

    function addToCart() {
        if (cart) {
        }
    }

    return (
        <>
            <NavBar />
            <CartContext.Provider value={{ cart, addToCart }}>
                <Routes>
                    <Route path="/" element={<ProductsPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/details/:id" element={<ProductDetailsPage />}></Route>
                </Routes>
            </CartContext.Provider>
        </>
    )
}

export default App
