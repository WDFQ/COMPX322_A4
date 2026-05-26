import { NavLink } from 'react-router-dom'

export function ProductCard({ product }) {
    const {
        id, // for linking to the details page
        title, // product name
        price, // 129.99
        category, // Electronics
        rating, // 4.6
        stock, // 15
        image, // image URL
    } = product

    return (
        <div className="bg-neutral-100 rounded-lg text-black">
            <img src={image} alt={title} className="rounded-lg" />
            <p>ID: {id}</p>
            <p>{title}</p>
            <p>${price}</p>
            <p>Category: {category}</p>
            <p>Rating: {rating}</p>
            <p>Stock Available: {stock}</p>

            <NavLink to={`/ProductsPage/${id}`}>View details</NavLink>
            <button>Add to Cart</button>
        </div>
    )
}
