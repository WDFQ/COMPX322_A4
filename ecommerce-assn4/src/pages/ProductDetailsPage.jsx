import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

export function ProductDetailsPage() {
    const { id } = useParams()
    const { cart, addToCart } = useContext(CartContext)

    const { data, isLoading, isError } = useQuery({
        queryKey: ['product', id],
        queryFn: () => getProduct(id),
    })

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Something went wrong.</p>

    const { title, price, category, description, stock, image } = data

    return (
        <div className="flex bg-white">
            <img src={image} alt={title} className="rounded-lg" />

            {/* text part of product */}
            <div flex flex-col jutify-around mx-10 px-10>
                <h2>{title}</h2>
                <p>{price}</p>
                <p>{category}</p>
                <p>{description}</p>
                <p>{stock}</p>

                <button onClick={handleClick}>Add to cart | {price}</button>
            </div>
        </div>
    )
}

async function getProduct(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`)
    if (!response.ok) {
        throw new Error(`Failed to fetch categories`)
    }
    return response.json()
}

function handleClick() {
    addToCart(product)
}
