import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { CartItem } from '../components/CartItem'
import { NavLink } from 'react-router-dom'

export function CartPage() {
    // render all cart items
    const { cart } = useContext(CartContext)

    // calculat total price
    let total = 0
    for (const product of cart) {
        total += product.price * product.quantity
    }

    // round total to 2dp
    total = total.toFixed(2)

    if (cart.length === 0) {
        return (
            <div className="text-center p-10">
                <p className="text-lg font-semibold text-gray-600 mb-4">Your cart is empty.</p>
                <NavLink to="/" className="bg-gray-800 text-white rounded-md px-6 py-3 hover:bg-gray-600">
                    Go Shopping
                </NavLink>
            </div>
        )
    }

    return (
        <div>
            {/* display all items */}
            {cart.map((product) => (
                <CartItem key={product.id} {...product} />
            ))}

            {/* display total price */}
            <div className="flex justify-between items-center border-t pt-4 mt-2">
                <p className="font-bold text-lg p-6">Total</p>
                <NavLink to={`/checkout`} className="hover:bg-gray-600 bg-gray-800 text-white rounded-md px-6 py-3 my-3">
                    Proceed to checkout
                </NavLink>

                <p className="font-bold text-lg p-6">${total}</p>
            </div>
        </div>
    )
}
