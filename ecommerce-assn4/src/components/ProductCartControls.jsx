import { Trash } from 'lucide-react'

export function ProductCartControls({ updateQuantity, removeFromCart, id, quantity }) {
    return (
        <div className="flex items-center gap-2">
            <Trash size={10} className="rounded-full bg-gray-800 text-white hover:bg-gray-600 w-7 h-7 flex items-center justify-center p-1.5" onClick={() => removeFromCart(id)} />
            <button className="w-7 h-7 rounded-full bg-gray-800 text-white hover:bg-gray-600" onClick={() => updateQuantity(id, quantity - 1)}>
                -
            </button>
            <span className="w-5 text-center text-sm">{quantity}</span>
            <button className="w-7 h-7 rounded-full bg-gray-800 text-white hover:bg-gray-600" onClick={() => updateQuantity(id, quantity + 1)}>
                +
            </button>
        </div>
    )
}
