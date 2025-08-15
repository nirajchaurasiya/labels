import Image from "next/image";
import Link from "next/link";

interface Product {
  title: string;
  price: number;
  image: string;
  url: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-orange-100 rounded-md overflow-hidden shadow-sm bg-white hover:shadow-md transition">
      <Image
        width={1000}
        height={1000}
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover p-4"
      />
      <div className="p-4">
        <h3 className="font-semibold text-sm">{product.title}</h3>
        <p className="text-sm text-gray-500 mb-3">From ${product.price} USD</p>
        <Link href={`/services/${product.url}`}>
          <button className="cursor-pointer rounded-md border text-white text-sm py-2 px-4 gold-theme-btn hover:text-white transition">
            Get Now
          </button>
        </Link>
      </div>
    </div>
  );
}
