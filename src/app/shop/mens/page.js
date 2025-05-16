"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/card";

export default function MensShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/public-products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        console.log("Fetched products:", data.products);
        setProducts(data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

return (
    <div className="pt-20 px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products
            .filter((product) => product.category === "male")
            .map((product) => (
                <ProductCard
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    description={product.description}
                    price={product.price}
                    onAddToCart={() => console.log(`Added ${product.name} to cart`)}
                />
            ))}
    </div>
    </div>
);
}