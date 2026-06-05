export function ProductFilters({ search, setSearch, setFinalSearch, filterOption, setFilterOption, priceSort, setPriceSort, categoryData }) {
    return (
        <div className="flex flex-wrap gap-4 items-center p-4 rounded-lg ">
            {/* search bar */}
            <input
                className="border border-gray-300 px-3 py-2 "
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && setFinalSearch(e.target.value)}
            />

            {/* filter bar */}
            <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)} className="border border-gray-300 rounded px-3 py-2 ">
                <option value={''}>Filter by categories...</option>
                {categoryData &&
                    categoryData.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
            </select>

            {/* sorting by price bar */}
            <select value={priceSort} onChange={(e) => setPriceSort(e.target.value)} className="border border-gray-300 rounded px-3 py-2">
                <option>Sort by price...</option>
                <option value={'price-asc'}>Ascending price</option>
                <option value={'price-desc'}>Descending price</option>
            </select>
        </div>
    )
}
