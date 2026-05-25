import { Link, NavLink } from 'react-router-dom'

export function NavBar() {
    //TODO: wireup cartCount to actual cart info
    const cartCount = 0

    return (
        <nav className="bg-gray-900 text-white px-8 py-4 flex items-center justify-between">
            {/* logo that also takes you to product page */}
            <NavLink to="/">
                <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
            </NavLink>

            {/* product page nav link */}
            <div className="flex items-center gap-8">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `text-sm font-semibold tracking-widest uppercase transition-colors ${isActive ? 'text-yellow-400' : 'text-white hover:text-yellow-400'}`
                    }
                >
                    Products
                </NavLink>
            </div>

            {/* cart page nav link */}
            <NavLink to="/cart">
                <ShoppingCart size={24} />
                {/* only show badge if cart has something */}
                {cartCount > 0 ? <span>{cartCount}</span> : null}
            </NavLink>
        </nav>
    )
}
