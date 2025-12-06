import React from "react";
import ProductListPage from "./ProductListPage";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <ProductListPage />
      </div>
    </div>
  );
};

export default HomePage;
