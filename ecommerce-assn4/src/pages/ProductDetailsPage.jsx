import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export function ProductDetailsPage() {
    const { id } = useParams()
    const { addToCart } = useContext(CartContext)
    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Something went wrong.</p>

    const { title, price, category, description, stock, image } = data

    function handleClick() {
        addToCart(data)
    }

    async function getProduct(id) {
        const response = await fetch(`http://localhost:3000/products/${id}`)
        if (!response.ok) {
            navigate('/notfound')
        }
        return response.json()
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
                <p className="mt-4 text-sm text-gray-600">In stock: {stock}</p>

                <button onClick={handleClick} className="mt-6 rounded-md bg-gray-800 px-4 py-3 text-white hover:bg-gray-600">
                    Add to cart | ${price}
                </button>
            </div>
        </div>
    )
}
