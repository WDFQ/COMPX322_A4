import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { ProductCartControls } from './ProductCartControls.jsx'

export function CartItem({ id, image, title, quantity, price }) {
    const { updateQuantity, removeFromCart } = useContext(CartContext)

    return (
        <div key={id} className="grid grid-cols-[80px_1fr_auto_auto] items-center gap-4 bg-neutral-100 rounded-xl p-6">
            <img src={image} alt={title} className="w-20 h-20 object-cover rounded-lg" />
            <p className="font-semibold text-sm truncate">{title}</p>
            <ProductCartControls updateQuantity={updateQuantity} removeFromCart={removeFromCart} quantity={quantity} id={id} />

            {/* total item price */}
            <p className="text-sm font-semibold text-right">${(price * quantity).toFixed(2)}</p>
        </div>
    )
}
