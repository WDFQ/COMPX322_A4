import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { TestTubeDiagonal } from 'lucide-react'

export function CartPage() {
    // render all cart items
    const { cart, addToCart } = useContext(CartContext)

    function increaseItem() {}

    function decreaseItem() {}

    // calculat total price
    let total = 0
    for (const product of cart) {
        total += product.price * product.quantity
    }

    return (
        <div>
            {/* display all items */}
            {cart.map((product) => (
                <div key={product.id} className="grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 bg-neutral-100 rounded-xl p-6">
                    <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-lg" />
                    <p className="font-semibold text-sm truncate">{product.title}</p>
                    <div className="flex items-center gap-2">
                        <button className="w-7 h-7 rounded-full bg-gray-800 text-white hover:bg-gray-600" onClick={decreaseItem}>
                            -
                        </button>
                        <span className="w-5 text-center text-sm">{product.quantity}</span>
                        <button className="w-7 h-7 rounded-full bg-gray-800 text-white hover:bg-gray-600" onClick={increaseItem}>
                            +
                        </button>
                    </div>
                    <p className="text-sm font-semibold text-right">${product.price * product.quantity}</p>
                </div>
            ))}

            {/* display total price */}
            <div className="flex justify-between items-center border-t pt-4 mt-2">
                <p className="font-bold text-lg p-6">Total</p>
                <p className="font-bold text-lg p-6">${total}</p>
            </div>
        </div>
    )
}
