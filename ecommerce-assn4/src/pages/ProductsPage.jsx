import { useState } from 'react'
import { NavBar } from '../components/Navbar'
import { ProductCard } from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'

export function ProductsPage() {
    const [search, setSearch] = useState('')
    const [finalSearch, setFinalSearch] = useState('')

    // get products from api
    const { data, isLoading, isError } = useQuery({
        queryKey: ['products', finalSearch],
        queryFn: () => getProducts({ search: finalSearch }),
    })

    if (isLoading) {
        return <p>Loading products...</p>
    } else if (isError) {
        return <p>An error has occured</p>
    }

    return (
        <>
            {/* search bar */}
            <input
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setFinalSearch(e.target.value)}
            />

            {/* all product cards */}
            <div className="grid grid-cols-3 px-50 gap-4 bg-white py-20">
                {data.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

// function to return the products from api with filtering, sorting, and searching
async function getProducts({ search }) {
    // params formatter
    const params = new URLSearchParams()

    if (search) {
        params.append('search', search)
    }

    const response = await fetch(`http://localhost:3000/products?${params}`)
    if (!response.ok) {
        throw new Error('failed to fetch products')
    }
    return response.json()
}
