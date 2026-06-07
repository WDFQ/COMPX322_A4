import { useContext, useState } from 'react'
import { NavBar } from '../components/Navbar'
import { ProductCard } from '../components/ProductCard'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../context/CartContext'
import { ProductFilters } from '../components/ProductFilters'

export function ProductsPage() {
    const [search, setSearch] = useState('')
    //const [finalSearch, setFinalSearch] = useState('')
    const [filterOption, setFilterOption] = useState('')
    const [priceSort, setPriceSort] = useState('')

    // get products from api
    const {
        data: productData,
        isLoading: isProductLoading,
        isError: isProductError,
    } = useQuery({
        queryKey: ['products', search, filterOption, priceSort],
        queryFn: () => getProducts({ search: search, filter: filterOption, sort: priceSort }),
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

    return (
        <>
            <ProductFilters
                search={search}
                setSearch={setSearch}
                filterOption={filterOption}
                setFilterOption={setFilterOption}
                priceSort={priceSort}
                setPriceSort={setPriceSort}
                categoryData={categoryData}
            />

            {isProductError || isCategoryError ? <p>An error has occurred</p> : null}
            {isProductLoading || isCategoryLoading ? <p>Loading...</p> : null}
            {!isProductError && !isCategoryError && !isProductLoading && !isCategoryLoading ? (
                <div className="grid grid-cols-1 px-35 gap-10 bg-white py-20 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {productData.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : null}
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
