import React, { useState } from "react";
import { IoStarSharp } from "react-icons/io5";

function Stars({ stars = 10 }) {
  // State to store the selected rating
  const [rating, setRating] = useState(0);
  // State to track the hover effect
  const [hover, setHover] = useState(0);

  /**
   * Handles click event on a star
   * @param {number} index - The index of the clicked star
   */
  const handleClick = (index) => {
    setRating(index); // Sets the final rating
  };

  /**
   * Handles mouse enter event (hover effect)
   * @param {number} index - The index of the hovered star
   */
  const handleMouseEnter = (index) => {
    setHover(index); // Highlights stars up to the hovered star
  };

  /**
   * Handles mouse leave event (resets hover effect)
   */
  const handleMouseLeave = () => {
    setHover(rating); // Reverts back to the final rating
  };

  return (
    <div className="star-rating">
      {/* Loop through an array of stars */}
      {[...Array(stars)].map((_, index) => {
        const starIndex = index + 1; // Convert 0-based index to 1-based index

        return (
          <IoStarSharp
            key={starIndex} // Unique key for React rendering
            className={starIndex <= (hover || rating) ? "active" : "inactive"}
            size={40} // Sets star size
            onClick={() => handleClick(starIndex)} // Sets rating on click
            onMouseEnter={() => handleMouseEnter(starIndex)} // Highlights on hover
            onMouseLeave={handleMouseLeave} // Removes highlight on mouse leave
          />
        );
      })}
    </div>
  );
}

export default Stars;
