import React, { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
function ShowSlider({ url, limit = 5, page = 1 }) {
  // State variables
  const [images, setImages] = useState([]); // Store fetched images
  const [current, setCurrent] = useState(0); // Track current slide index
  const [errorMsg, setErrorMsg] = useState(null); // Store error messages
  const [loading, setLoading] = useState(false); // Track loading state

  // Function to fetch images from API
  const fetchImages = async (fetchUrl) => {
    try {
      setLoading(true); // Show loading state
      console.log(`Fetching: ${fetchUrl}?page=${page}&limit=${limit}`);

      const response = await fetch(`${fetchUrl}?page=${page}&limit=${limit}`);
      const data = await response.json(); // Convert response to JSON

      if (data && data.length > 0) {
        setImages(data); // Store images in state
        console.log("Images fetched successfully:", data);
      } else {
        console.warn("No images found!");
      }

      setLoading(false); // Hide loading state
    } catch (err) {
      console.error("Fetch error:", err.message);
      setErrorMsg(err.message); // Store error message
      setLoading(false);
    }
  };

  // Fetch images when component mounts or when `url` changes
  useEffect(() => {
    if (url) {
      fetchImages(url);
    }
  }, [url]);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Show loading message
  if (loading) {
    return (
      <div className="text-center text-lg text-blue-600">
        Loading images... ⏳
      </div>
    );
  }

  // Show error message if API request fails
  if (errorMsg) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Error: {errorMsg}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      {/* Image container with max height, center alignment, and shadow */}
      <div className="overflow-hidden relative rounded-lg shadow-lg w-full h-96 flex items-center justify-center bg-gray-100">
        {images.length > 0 && (
          <img
            src={images[current].download_url} // Display current image
            alt={`Slide ${current + 1}`}
            className="w-full h-auto max-h-96 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110"
          />
        )}

        {/* Left Arrow Button */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 
          bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
          onClick={prevSlide}>
          <BsArrowLeftCircleFill size={30} />
        </button>

        {/* Right Arrow Button */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 
          bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
          onClick={nextSlide}>
          <BsArrowRightCircleFill size={30} />
        </button>

        {/* Dots Indicator for Slide Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                current === index ? "bg-white scale-125" : "bg-gray-500"
              }`}></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowSlider;
