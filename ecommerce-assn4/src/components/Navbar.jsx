import { Link, NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export function NavBar() {
    const { cart } = useContext(CartContext)
    //TODO: wireup cartCount to actual cart info
    const cartCount = cart.length
    console.log(cartCount)

    return (
        <nav className="bg-mist-900 text-white px-8 py-4 flex items-center justify-between">
            {/* logo that also takes you to product page */}
            <NavLink to="/">
                {/* <img src="/logo.png" alt="Logo" className="h-10 w-auto" /> */}
                <span className="text-xl font-bold">Shop</span>
            </NavLink>

            {/* product page nav link */}
            <NavLink to="/">Products</NavLink>

            {/* cart page nav link */}
            <NavLink to="/cart">
                <ShoppingCart size={24} />
                {/* only show badge if cart has something */}
                {cartCount > 0 ? <span>{cartCount}</span> : null}
            </NavLink>
        </nav>
    )
}
