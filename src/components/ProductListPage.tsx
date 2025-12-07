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
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const limit = 6; // items per page
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(limit));
        if (search.trim() !== "") {
          params.set("search", search.trim());
        }

        const response = await fetch(
          `${BASE_URL}/products?${params.toString()}`
        );

        if (!response.ok) {
          console.log("Error fetching products");
          setLoading(false);
          return;
        }

        const data = await response.json();

        setProducts(data.data);
        setTotalPages(data.pagination.totalPages);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const delay = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delay);
  }, [page, search]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4 text-gray-700">Products</h1>

      {/* Search Box */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by product name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // reset page on search
          }}
          className="w-full sm:w-72 border px-3 py-2 rounded-md text-sm"
        />
      </div>

      {loading && <p className="text-gray-600 mb-4">Loading...</p>}

      {!loading && products.length === 0 && (
        <p className="text-gray-500 mb-4">No products found.</p>
      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {!loading &&
          products.map((each: Product) => (
            <ProductCard key={each.id} product={each} />
          ))}
      </div>

      {/* Pagination */}
      {!loading && products.length > 0 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md bg-white disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
