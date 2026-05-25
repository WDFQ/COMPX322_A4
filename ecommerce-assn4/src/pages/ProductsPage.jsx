import { NavBar } from '../components/Navbar'

export function ProductsPage() {
    // get products from api

    // get available categories

    return (
        <>
            <NavBar />

            <div>
                {users.map((user) => (
                    // Always include a unique key
                    <li key={user.id}>{user.name}</li>
                ))}
            </div>
        </>
    )
}
