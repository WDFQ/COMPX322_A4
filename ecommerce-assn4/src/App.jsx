import { Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { ProductsPage } from './pages/ProductsPage'
import { NavBar } from './components/Navbar'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { useState } from 'react'
import { CartContext } from './context/CartContext'
import { infiniteQueryOptions } from '@tanstack/react-query'

function App() {
    // cart holds product objects with a quantity parameter
    const [cart, setCart] = useState([])

    function addToCart(product) {
        // find the product via its id
        const item = cart.find((item) => item.id === product.id)
        if (!item) {
            // create new list with new product and set quantity to 1
            setCart([...cart, { ...product, quantity: 1 }])
        } else {
            // create new list and if product matches with the target then increase its quantity
            setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
        }
    }

    return (
        <>
            <CartContext.Provider value={{ cart, addToCart }}>
                <NavBar />
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
