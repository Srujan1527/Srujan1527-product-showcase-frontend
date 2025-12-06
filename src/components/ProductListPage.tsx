import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

export interface Product {
  category: string;
  created_at: Date;
  id: number;
  image_url: string;
  long_desc: string;
  name: string;
  price: string;
  short_desc: string;
}

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${BASE_URL}/products`);

        if (!response.ok) {
          console.log("Error while fetching products");
          return;
        }

        const data = await response.json();
        console.log(data.data);
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((each: Product) => (
          <ProductCard key={each.id} product={each} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
