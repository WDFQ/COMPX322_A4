import { NavLink } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export function NavBar() {
    const { cart } = useContext(CartContext)
    const cartCount = cart.length

    return (
        <nav className="flex items-center bg-mist-900 px-8 py-4 text-white">
            <NavLink to="/" className="rounded-md bg-white/10 px-3 py-2 text-sm font-medium shadow-sm ring-1 ring-white/10 transition-colors hover:bg-white/20">
                Products
            </NavLink>

            <NavLink to="/" className="flex-1 text-center text-xl font-bold">
                1ꌗ꓄-ꃅꍏꈤꀸ ꂵꍏꋪꀘꍟ꓄ꉣ꒒ꍏꉓꍟ
            </NavLink>

            <NavLink to="/cart" className="flex items-center gap-2">
                <ShoppingCart size={24} />
                {cartCount > 0 ? <span>{cartCount}</span> : null}
            </NavLink>
        </nav>
    )
}
