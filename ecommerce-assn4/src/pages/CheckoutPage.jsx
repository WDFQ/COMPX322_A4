export function CheckoutPage() {
    return (
        <form>
            <label>
                Input Value:
                <input type="text" value={inputValue} onChange={handleChange} />
            </label>
            <p>Input Value: {inputValue}</p>
        </form>
    )
}
