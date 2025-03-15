import React, { useState, useEffect } from "react"; // Importing necessary dependencies
import axios from "axios"; // Importing Axios for API requests
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"; // Importing icons for navigation buttons

function SliderUsingAxios() {
  // State variables to manage images, current slide index, error message, and loading state
  const [images, setImages] = useState([]); // Stores the fetched images
  const [current, setCurrent] = useState(0); // Tracks the index of the currently displayed image
  const [errorMsg, setErrorMsg] = useState(null); // Stores any error message from the API request
  const [loading, setLoading] = useState(false); // Tracks whether the API request is in progress

  // API details
  const url = "https://picsum.photos/v2/list"; // URL to fetch random images
  const limit = 20; // Number of images to fetch
  const page = 1; // Page number for pagination

  useEffect(() => {
    // Function to fetch images from API
    const fetchImages = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching
        const response = await axios.get(`${url}?page=${page}&limit=${limit}`); // Fetch images from API
        setImages(response.data); // Store the fetched images in state
        setLoading(false); // Set loading state to false after fetching
      } catch (error) {
        setErrorMsg(error.message); // Store the error message if request fails
        setLoading(false); // Set loading state to false
      }
    };

    fetchImages(); // Call the function to fetch images
  }, []); // Run once when the component mounts

  // Function to navigate to the previous slide
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1)); // Loop back to last image if at first image
  };

  // Function to navigate to the next slide
  const nextSlide = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1)); // Loop back to first image if at last image
  };

  // Display loading message while images are being fetched
  if (loading) {
    return (
      <div className="text-center text-lg text-blue-600">
        Loading images... ⏳
      </div>
    );
  }

  // Display error message if API request fails
  if (errorMsg) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Error: {errorMsg}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto p-4">
      {/* Container for the slider */}
      <div className="overflow-hidden relative rounded-lg shadow-lg w-full h-96 flex items-center justify-center bg-gray-100">
        {/* Display the current image if images are available */}
        {images.length > 0 && (
          <img
            src={images[current].download_url} // Image source
            alt={`Slide ${current + 1}`} // Image description
            className="w-full h-auto max-h-96 object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-110" // Styling and animation
          />
        )}

        {/* Left navigation button */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
          onClick={prevSlide}>
          <BsArrowLeftCircleFill size={30} />
        </button>

        {/* Right navigation button */}
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
          onClick={nextSlide}>
          <BsArrowRightCircleFill size={30} />
        </button>

        {/* Dots for slide navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)} // Set current image on dot click
              className={`h-3 w-3 rounded-full transition-all ${
                current === index ? "bg-white scale-125" : "bg-gray-500"
              }`}></button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SliderUsingAxios; // Export the component for use in other files
