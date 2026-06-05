import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { CartItem } from '../components/CartItem'

export function CartPage() {
    // render all cart items
    const { cart } = useContext(CartContext)

    // calculat total price
    let total = 0
    for (const product of cart) {
        total += product.price * product.quantity
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
                <p className="font-bold text-lg p-6">${total}</p>
            </div>
        </div>
    )
}
