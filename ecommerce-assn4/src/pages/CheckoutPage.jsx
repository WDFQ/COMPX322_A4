import { useForm } from 'react-hook-form'

export function CheckoutPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    function submitForm(data) {}

    return (
        <form onSubmit={handleSubmit(submitForm)} className="max-w-xl mx-auto p-6 space-y-4">
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

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Phone number</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="tel"
                    placeholder="Enter phone number..."
                    {...register('phone', { required: 'Phone is required' })}
                ></input>
                {errors.phone ? <p className="text-sm text-red-600">{errors.phone.message}</p> : null}
            </div>

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

            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Postcode</label>
                <input
                    className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    type="text"
                    placeholder="Enter postcode..."
                    {...register('postcode', { required: 'Postcode is required' })}
                ></input>
                {errors.postcode ? <p className="text-sm text-red-600">{errors.postcode.message}</p> : null}
            </div>

            <button className="w-full bg-gray-800 text-white rounded-md px-6 py-3 hover:bg-gray-600" type="submit">
                Checkout
            </button>
        </form>
    )
}
