import React from "react";

export default function ProductCard({ image, title, description, price, }) {
  return (
    <div className="bg-white border-2 border-black shadow-md overflow-hidden flex flex-col">
      <div className="h-56 sm:h-56 md:h-64 lg:h-96 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={image}
          alt={title}
        />
      </div>
      <div className="p-4 flex flex-col justify-between flex-grow bg-black">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-2 text-white">{title}</h2>
          <p className="text-sm sm:text-base text-white mb-4">{description}</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <span className="text-xl font-semibold text-white">₹{price}</span>
          <button
            // onClick={onAddToCart}
            className="cart-button w-full sm:w-auto bg-white text-black font-semibold border border-black px-4 py-2 hover:bg-black hover:text-white transition-colors duration-300 hover:cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}