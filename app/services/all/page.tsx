import ProductCard from "@/app/components/ProductCard";
import Sidebar from "@/app/components/SidebarProductCard";
import SortDropdown from "@/app/components/SafeDropdown";
import ProductDetailModal from "@/app/components/ProductDetailModal";
import HeatPressInstructions from "@/app/components/HeatPressInstructions";

const products = [
  {
    title: "DTF Transfers by Size",
    price: 0.9,
    image: "/1.jpg",
    url: "/dtf-transfers-by-size",
  },
  {
    title: "Upload your DTF gang sheet",
    price: 15.12,
    image: "/1.jpg",
    url: "/upload-your-dtf-gangsheet",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 md:px-12 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="w-full">
          <p className="text-3xl font-semibold mb-5">Our Services</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
