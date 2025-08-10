export default function SortDropdown() {
  return (
    <div className="flex justify-end mb-4">
      <label className="text-sm mr-2 font-medium">Sort by:</label>
      <select className="border border-gray-300 rounded px-2 py-1 text-sm">
        <option>Alphabetically, A-Z</option>
        <option>Alphabetically, Z-A</option>
        <option>Price, low to high</option>
        <option>Price, high to low</option>
      </select>
    </div>
  );
}
