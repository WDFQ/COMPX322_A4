import { useState, useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { useMutation } from '@tanstack/react-query'
import { createOrder } from '../services/api'

// calculate total price in cart
function calcTotal(cart) {
    let total = 0
    for (const item of cart) {
        total += item.price * item.quantity
    }
    return total.toFixed(2)
}

export function CheckoutPage() {
    const { cart } = useContext(CartContext)

    // controlled form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postcode: '',
    })

    // validation error state
    const [errors, setErrors] = useState({})

    // update the correct field and clear its error on change
    function handleChange(e) {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setErrors((prev) => ({ ...prev, [name]: null }))
    }

    // validate all fields
    function validate(data) {
        const newErrors = {}

        if (!data.name.trim()) {
            newErrors.name = 'Name is required'
        }

        if (!data.email.trim()) {
            newErrors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Please enter a valid email address'
        }

        if (!data.phone.trim()) {
            newErrors.phone = 'Phone is required'
        } else if (!/^[0-9+\s]+$/.test(data.phone)) {
            newErrors.phone = 'Phone number can only contain numbers, spaces, or +'
        }

        if (!data.address.trim()) {
            newErrors.address = 'Delivery address is required'
        }

        if (!data.city.trim()) {
            newErrors.city = 'City is required'
        }

        if (!data.postcode.trim()) {
            newErrors.postcode = 'Postcode is required'
        } else if (!/^\d{4}$/.test(data.postcode)) {
            newErrors.postcode = 'Postcode can only have 4 numbers'
        }

        return newErrors
    }

    const addToOrders = useMutation({
        mutationFn: submitForm,
        onError: (err) => {
            console.log('Error during POST request:' + err.message)
            alert('Checkout failed! Err' + err.message)
        },
    })

    // post function
    async function submitForm(data) {
        const payload = {
            customer: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                delivery_address: data.address,
                city: data.city,
                postcode: data.postcode,
            },
            items: cart,
            total: calcTotal(cart),
        }

        return createOrder(payload)
    }

    // handle form submission with validation
    function handleSubmit(e) {
        e.preventDefault()

        const validationErrors = validate(formData)

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        addToOrders.mutate(formData)
    }

    if (addToOrders.isSuccess) {
        // trigger confirmation page
        return (
            <div className="max-w-xl mx-auto p-10 text-center space-y-4 bg-gray-50 rounded-lg border border-gray-200 mt-6">
                <div className="text-emerald-600 text-5xl">✓</div>
                <h2 className="text-2xl font-bold text-gray-800">Order Confirmed!</h2>
                <p className="text-gray-600">Thank you for your purchase. Your order is now being teleported to your front door.</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 space-y-4">
            {/* name input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    name="name"
                    placeholder="Enter full name..."
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name ? <p className="text-sm text-red-600">{errors.name}</p> : null}
            </div>

            {/* email input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="email"
                    name="email"
                    placeholder="Enter email..."
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email ? <p className="text-sm text-red-600">{errors.email}</p> : null}
            </div>

            {/* phone input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number..."
                    value={formData.phone}
                    onChange={handleChange}
                />
                {errors.phone ? <p className="text-sm text-red-600">{errors.phone}</p> : null}
            </div>

            {/* address input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Delivery address</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    name="address"
                    placeholder="Enter delivery address..."
                    value={formData.address}
                    onChange={handleChange}
                />
                {errors.address ? <p className="text-sm text-red-600">{errors.address}</p> : null}
            </div>

            {/* city input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    name="city"
                    placeholder="Enter city..."
                    value={formData.city}
                    onChange={handleChange}
                />
                {errors.city ? <p className="text-sm text-red-600">{errors.city}</p> : null}
            </div>

            {/* postcode input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Postcode</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="number"
                    name="postcode"
                    placeholder="Enter postcode..."
                    value={formData.postcode}
                    onChange={handleChange}
                />
                {errors.postcode ? <p className="text-sm text-red-600">{errors.postcode}</p> : null}
            </div>

            {/* submit button */}
            <button className="w-full bg-gray-800 text-white rounded-md px-6 py-3 hover:bg-gray-600" type="submit">
                {/* prevents double clicking */}
                {addToOrders.isPending ? 'Processing...' : 'Checkout'}
            </button>
        </form>
    )
}
