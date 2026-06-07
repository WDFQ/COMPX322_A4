import { useContext } from 'react'
import { useForm } from 'react-hook-form'
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

    // react hook form stuff
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const addToOrders = useMutation({
        mutationFn: submitForm,
        onError: (err) => {
            console.log('Error during POST request:' + err.message)
            alert('Checkout failed! Err' + err.message)
        },
    })

    function createPayload() {
        return
    }

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
        <form onSubmit={handleSubmit(addToOrders.mutate)} className="max-w-xl mx-auto p-6 space-y-4">
            {/* name input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Full name</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    placeholder="Enter full name..."
                    {...register('name', { required: 'Name is required' })}
                ></input>
                {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
            </div>

            {/* email input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="email"
                    placeholder="Enter email..."
                    {...register('email', { required: 'Email is required' })}
                ></input>
                {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
            </div>

            {/* phone input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="tel"
                    placeholder="Enter phone number..."
                    {...register('phone', {
                        required: 'Phone is required',
                        pattern: {
                            // regex to only allow numbers spaces and + symbol
                            value: /^[0-9+\s]+$/,
                            message: 'Phone number can only contain numbers, spaces, or +',
                        },
                    })}
                ></input>
                {errors.phone ? <p className="text-sm text-red-600">{errors.phone.message}</p> : null}
            </div>

            {/* address input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Delivery address</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    placeholder="Enter delivery address..."
                    {...register('address', { required: 'Delivery address is required' })}
                ></input>
                {errors.address ? <p className="text-sm text-red-600">{errors.address.message}</p> : null}
            </div>

            {/* city input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    placeholder="Enter city..."
                    {...register('city', { required: 'City is required' })}
                ></input>
                {errors.city ? <p className="text-sm text-red-600">{errors.city.message}</p> : null}
            </div>

            {/* postcode input */}
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Postcode</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="number"
                    placeholder="Enter postcode..."
                    {...register('postcode', { required: 'Postcode is required', pattern: { value: /^\d{4}$/, message: 'Postcode can only have 4 numbers' } })}
                ></input>
                {errors.postcode ? <p className="text-sm text-red-600">{errors.postcode.message}</p> : null}
            </div>

            {/* submit button */}
            <button className="w-full bg-gray-800 text-white rounded-md px-6 py-3 hover:bg-gray-600" type="submit">
                {/* prevents double clicking */}
                {addToOrders.isPending ? 'Processing...' : 'Checkout'}
            </button>
        </form>
    )
}
