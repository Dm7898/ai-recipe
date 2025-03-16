const FilterBar = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sortOrder,
  setSortOrder,
  categories = [],
  showCategory = true, // Default to true
}) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      {/* Search Filter */}
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-2 rounded-md"
      />

      {/* Category Filter (Shown Only If `showCategory` is true) */}
      {showCategory && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      {/* Sorting */}
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        className="border px-4 py-2 rounded-md"
      >
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  );
};

export default FilterBar;
