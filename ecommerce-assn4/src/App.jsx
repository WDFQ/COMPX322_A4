import { Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { ProductsPage } from './pages/ProductsPage'
import { NavBar } from './components/Navbar'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductDetailsPage } from './pages/ProductDetailsPage'
import { useEffect, useState } from 'react'
import { CartContext } from './context/CartContext'
import { CheckoutPage } from './pages/CheckoutPage'

function App() {
    // cart holds product objects with a quantity parameter
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    function updateQuantity(id, newQuantity) {
        if (newQuantity < 1) {
            removeFromCart(id)
            return
        }

        const item = cart.find((item) => item.id === id)
        if (newQuantity > item.stock) {
            alert('No more extra stock to add to cart!')
            return
        }

        // reboot list with new quantity
        setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    function removeFromCart(id) {
        setCart(cart.filter((item) => item.id !== id))
    }

    function addToCart(product) {
        // find the product via its id
        const item = cart.find((item) => item.id === product.id)
        if (!item) {
            // create new list with new product and set quantity to 1
            setCart([...cart, { ...product, quantity: 1 }])
        } else {
            if (item.quantity < product.stock) {
                // create new list and if product matches with the target then increase its quantity
                setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
            } else {
                alert('No more extra stock to add to cart!')
            }
        }
    }

    return (
        <>
            <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart }}>
                <NavBar />
                <Routes>
                    <Route path="/" element={<ProductsPage />}></Route>
                    <Route path="/cart" element={<CartPage />}></Route>
                    <Route path="/details/:id" element={<ProductDetailsPage />}></Route>
                    <Route path="/notfound" element={<NotFoundPage />}></Route>
                    <Route path="/checkout" element={<CheckoutPage />}></Route>
                </Routes>
            </CartContext.Provider>
        </>
    )
}

export default App
