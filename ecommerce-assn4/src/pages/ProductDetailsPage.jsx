export function ProductDetailsPage({ title, image, description, category, price, stock }) {
    return (
        <div className="flex">
            <img src={image} alt={title} className="rounded-lg" />

            {/* text part of product */}
            <div>
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

async function handleClick() {
    // update backend with added cart item
    fetch
}
