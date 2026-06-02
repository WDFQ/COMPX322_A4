import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

export function CartPage() {
    // render all cart items
    const { cart, addToCart } = useContext(CartContext)

    function increaseItem() {}

    function decreaseItem() {}

    return (
        <div>
            {cart.map((product) => (
                <div key={product.id}>
                    <img src={product.image} />
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                    <button>-</button>
                    <button>+</button>
                </div>
            ))}
        </div>
    )
}
