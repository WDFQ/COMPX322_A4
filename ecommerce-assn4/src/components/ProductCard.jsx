import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export function ProductCard({ product }) {
    const { cart, addToCart } = useContext(CartContext)

    const {
        id, // for linking to the details page
        title, // product name
        price, // 129.99
        category, // Electronics
        rating, // 4.6
        stock, // 15
        image, // image URL
    } = product

    // adds to cart via parent contexts
    function handleAddCart() {
        addToCart(product)
    }

    return (
        <div className="flex flex-col bg-neutral-100 rounded-lg text-black group">
            <div className="w-full h-55 overflow-hidden">
                <img src={image} className="w-full h-full object-cover" />
            </div>

            <p className="text-lg text-xl font-bold">{title}</p>
            <p>${price}</p>
            <p className="text-xs text-gray-600">Category: {category}</p>
            <p className="text-xs text-gray-600">Rating: {rating}</p>
            <p className="text-xs text-gray-600">Stock Available: {stock}</p>

            <div className="flex gap-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <NavLink to={`/details/${id}`} className="hover:bg-gray-600 bg-gray-800 text-white rounded-md px-2 my-3">
                    View details
                </NavLink>
                <button className="hover:bg-gray-600 bg-gray-800 text-white rounded-md px-2 my-3" onClick={handleAddCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
