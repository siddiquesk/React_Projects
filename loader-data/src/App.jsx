import React, { useEffect, useState } from "react";

function App() {
  // State to manage loading state
  const [loading, setLoading] = useState(false);

  // State to store the list of fetched products
  const [product, setProduct] = useState([]);

  // State to manage button disable functionality when 100 products are loaded
  const [disabled, setDisabled] = useState(false);

  // State to track the current page count for pagination
  const [count, setCount] = useState(0);

  /**
   * Function to fetch products from the API based on the `count` value.
   * The `skip` parameter is used for pagination.
   * Products are fetched in batches of 20.
   */
  const fetchProduct = async () => {
    try {
      setLoading(true); // Start loading state

      // Fetch data from API with pagination
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const result = await response.json();

      setLoading(false); // Stop loading state

      // If products are available, update the state and append new products
      if (result && result.products) {
        setProduct((previous) => [...previous, ...result.products]);
      }
    } catch (err) {
      console.log("Error fetching data:", err);
      setLoading(false);
    }
  };

  /**
   * useEffect runs `fetchProduct` whenever `count` changes.
   * This allows new products to be fetched when the "Load More" button is clicked.
   */
  useEffect(() => {
    fetchProduct();
  }, [count]);

  /**
   * This useEffect watches the `product` array.
   * If the total number of products reaches 100, it disables the "Load More" button.
   */
  useEffect(() => {
    if (product && product.length === 100) {
      setDisabled(true);
    }
  }, [product]);

  // Show loading message while fetching data
  if (loading) {
    return <h2 className="text-center text-2xl font-bold mt-10">Loading...</h2>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {/* Load More Button - Centered */}
      <div className="flex justify-center">
        <button
          className="bg-red-500 text-white rounded-md hover:bg-amber-700 duration-300 ease-in-out p-2 cursor-pointer mb-4 disabled:opacity-50"
          onClick={() => setCount(count + 1)}
          disabled={disabled} // Disable button when 100 products are reached
        >
          Load more data
        </button>
      </div>

      {/* Message displayed when user reaches 100 products */}
      {disabled ? (
        <p className="text-xl text-red-800 font-semibold mb-2">
          You have reached the limit of 100 products.
        </p>
      ) : null}

      {/* Product Grid - Displays products in a responsive grid format */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.length > 0 ? (
          product.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden p-4 transition transform hover:scale-105 mb-4">
              {/* Product Image */}
              <img
                src={item.thumbnail}
                alt={item.description}
                className="w-full h-40 object-cover rounded-md"
              />

              {/* Product Details */}
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                <p className="mt-2 font-bold text-gray-800">${item.price}</p>
              </div>
            </div>
          ))
        ) : (
          // Show message if no products are found
          <h2 className="text-xl font-semibold">No products found</h2>
        )}
      </div>
    </div>
  );
}

export default App;
