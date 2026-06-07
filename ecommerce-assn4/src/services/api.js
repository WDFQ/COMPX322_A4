const BASE_URL = 'http://localhost:3000'

// function to return the products from api with filtering, sorting, and searching
export async function getProducts({ search, filter, sort }) {
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

    const response = await fetch(`${BASE_URL}/products?${params}`)
    if (!response.ok) {
        throw new Error('Failed to fetch products')
    }
    return response.json()
}

// fetch all product categories
export async function getCategories() {
    const response = await fetch(`${BASE_URL}/products/categories`)
    if (!response.ok) {
        throw new Error(`Failed to fetch categories`)
    }
    return response.json()
}

// fetch a single product by id
export async function getProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`)
    if (!response.ok) {
        throw new Error('Failed to fetch product')
    }
    return response.json()
}

// post a new order to the api
export async function createOrder(payload) {
    const response = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(payload),
    })
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return response.json()
}
