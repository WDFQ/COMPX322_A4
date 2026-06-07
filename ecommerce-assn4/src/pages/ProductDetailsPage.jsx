import { useQuery } from '@tanstack/react-query'
import { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { getProduct } from '../services/api'

export function ProductDetailsPage() {
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)
    const [showToast, setShowToast] = useState(false)
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
    })

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (isError) {
        navigate('/notfound')
        return null
    }

    const { title, price, category, rating, description, stock, image } = data

    function handleClick() {
        addToCart(data)

        // shows added to cart message
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
        }, 3000)
    }

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-8 bg-gray-50 p-6 md:flex-row md:items-start md:p-10">
            <img src={image} alt={title} className="w-full rounded-lg border border-gray-200 bg-white object-contain p-4 shadow-sm md:max-w-md" />

            {/* text part of product */}
            <div className="flex flex-col justify-around rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200 md:flex-1">
                <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
                <p className="mt-2 text-xl font-semibold text-gray-800">${price}</p>
                <p className="mt-2 text-sm uppercase tracking-wide text-gray-500">{category}</p>
                <p className="mt-4 text-gray-700">{description}</p>
                <p className="mt-4 text-sm text-gray-600">Rating: {rating}</p>
                <p className="text-sm text-gray-600">In stock: {stock}</p>

                <button onClick={handleClick} className="mt-6 rounded-md bg-gray-800 px-4 py-3 text-white hover:bg-gray-600">
                    Add to cart | ${price}
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
