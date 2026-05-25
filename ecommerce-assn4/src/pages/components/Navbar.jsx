import { Link, NavLink } from 'react-router-dom'

export function NavBar() {
    return (
        <nav>
            <NavLink to="/">Products</NavLink>
            <NavLink to="/cart">Cart</NavLink>
        </nav>
    )
}
