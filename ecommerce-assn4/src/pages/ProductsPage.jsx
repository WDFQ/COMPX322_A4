import { useState } from 'react'
import { NavBar } from '../components/Navbar'
import { ProductCard } from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'

export function ProductsPage() {
    const [search, setSearch] = useState('')
    const [finalSearch, setFinalSearch] = useState('')
    const [filterOption, setFilterOption] = useState('')

    // get products from api
    const {
        data: productData,
        isLoading: isProductLoading,
        isError: isProductError,
    } = useQuery({
        queryKey: ['products', finalSearch],
        queryFn: () => getProducts({ search: finalSearch }),
    })

    const {
        data: categoryData,
        isLoading: isCategoryLoading,
        isError: isCategoryError,
    } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories,
    })

    if (isProductLoading || isCategoryLoading) {
        return <p>Loading...</p>
    }

    if (isProductError || isCategoryError) {
        return <p>An error has occurred</p>
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

            <label>Filter by category:</label>
            <select value={filterOption} onChange={setFilterOption}>
                <option value="">All Categories</option>
                {categoryData.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            {/* all product cards */}
            <div className="grid grid-cols-3 px-50 gap-4 bg-white py-20">
                {productData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

async function getCategories() {
    const response = await fetch(`http://localhost:3000/products/categories`)
    if (!response.ok) {
        throw new Error(`Failed to fetch categories`)
    }
    return response.json()
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
        throw new Error('Failed to fetch products')
    }
    return response.json()
}
