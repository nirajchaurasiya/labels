export default function Sidebar() {
  return (
    <aside className="w-full md:w-1/4 pr-6 mb-6 md:mb-0">
      <div className="mb-6">
        <h4 className="font-bold mb-2">Availability</h4>
        <div className="space-y-1 text-sm text-gray-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            In stock (2)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Out of stock (0)
          </label>
        </div>
      </div>
    </aside>
  );
}
