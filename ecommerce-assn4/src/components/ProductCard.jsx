import { NavLink } from 'react-router-dom'

export function ProductCard({ product }) {
    const {
        id, // for linking to the details page
        title, // product name
        price, // 29.99
        category, // electronics
        rating, // { rate: 4.2, count: 120 }
        stockNum, // number available
        image, // image URL
    } = product

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden flex flex-col">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
            <p>{id}</p>
            <p>{title}</p>
            <p>{price}</p>
            <p>{category}</p>
            <p>{rating.rate}</p>
            <p>{rating.count}</p>
            <p>{stockNum}</p>

            <NavLink to={`/ProductsPage/${id}`}>View details</NavLink>
            <button>Add to Cart</button>
        </div>
    )
}
