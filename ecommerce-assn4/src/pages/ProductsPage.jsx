import { useState } from 'react'
import { NavBar } from '../components/Navbar'
import { ProductCard } from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'

export function ProductsPage() {
    const [search, setSearch] = useState('')
    const [finalSearch, setFinalSearch] = useState('')
    const [filterOption, setFilterOption] = useState('')
    const [priceSort, setPriceSort] = useState('')

    // get products from api
    const {
        data: productData,
        isLoading: isProductLoading,
        isError: isProductError,
    } = useQuery({
        queryKey: ['products', finalSearch, filterOption, priceSort],
        queryFn: () => getProducts({ search: finalSearch, filter: filterOption, sort: priceSort }),
    })

    // get all categories from api
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
            <div className="flex flex-wrap gap-4 items-center p-4 rounded-lg ">
                {/* search bar */}
                <input
                    className="border border-gray-300 px-3 py-2 "
                    type="text"
                    placeholder="Search products"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && setFinalSearch(e.target.value)}
                />

                {/* filter bar */}
                <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)} className="border border-gray-300 rounded px-3 py-2 ">
                    <option value={''}>Filter by categories...</option>
                    {categoryData.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>

                {/* sorting by price bar */}
                <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
                    <option>Sort by price...</option>
                    <option value={'price-asc'}>Ascending price</option>
                    <option value={'price-desc'}>Descending price</option>
                </select>
            </div>

            {/* all product cards */}
            <div className="grid grid-cols-3 px-35 gap-10 bg-white py-20">
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
async function getProducts({ search, filter, sort }) {
    // params formatter
    const params = new URLSearchParams()

    if (search) {
        params.append('search', search)
    }

    if (filter) {
        params.append('category', filter)
    }

    if (sort) {
        params.append('sort', sort)
    }

    const response = await fetch(`http://localhost:3000/products?${params}`)
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json()
}
