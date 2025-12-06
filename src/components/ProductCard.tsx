import React from "react";
import type { Product } from "./ProductListPage";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-sm rounded-md p-4 border hover:shadow-md transition">
      {/* Image */}
      <div className="w-full h-40 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Product Info */}
      <h2 className="mt-3 text-lg font-medium text-gray-800">{product.name}</h2>

      <p className="text-sm text-gray-500 mt-1">{product.short_desc}</p>

      <p className="text-gray-700 font-semibold mt-2">₹{product.price}</p>

      {/* Enquiry Button */}
      <Link to={`/enquire?productId=${product.id}`}>
        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700 transition">
          Enquire
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
