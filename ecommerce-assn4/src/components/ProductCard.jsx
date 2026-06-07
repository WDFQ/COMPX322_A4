import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext)
    const [showToast, setShowToast] = useState(false)

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

        // shows added to cart message
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000)
    }

    return (
        <div className="group flex flex-col overflow-hidden rounded-lg bg-neutral-100 text-center text-black shadow-sm ring-1 ring-gray-200">
            <div className="h-55 w-full overflow-hidden">
                <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>

            {/* product details */}
            <div className="flex flex-col gap-1 px-4 py-4">
                <p className="text-lg font-bold text-gray-900">{title}</p>
                <p className="text-base font-semibold text-gray-800">${price}</p>
                <p className="text-xs text-gray-600">Category: {category}</p>
                <p className="text-xs text-gray-600">Rating: {rating}</p>
                <p className="text-xs text-gray-600">Stock Available: {stock}</p>
            </div>

            {/* button at bottom of card */}
            <div className="flex justify-center gap-2 px-4 pb-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <NavLink to={`/details/${id}`} className="rounded-md bg-gray-800 px-3 py-2 text-white hover:bg-gray-600">
                    View details
                </NavLink>
                <button className="rounded-md bg-gray-800 px-3 py-2 text-white hover:bg-gray-600" onClick={handleAddCart}>
                    Add to Cart
                </button>

                {/* popup for showing car added successfully */}
                {showToast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-xl z-50 flex items-center space-x-2 animate-fade-in-up">
                        <span>Added to cart!</span>
                    </div>
                )}
            </div>
        </div>
    )
}
