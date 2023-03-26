import React from "react";

const Form = ({
  zipCode,
  setZipCode,
  distance,
  setDistance,
  category,
  setCategory,
  rating,
  setRating,
  handleSubmit,
  isValidForm,
  disabled,
  categories,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Zip Code:
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
      </label>
      <label>
        Distance (miles):
        <input
          type="number"
          min="2"
          max="24"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => (
            <option key={cat.alias} value={cat.alias}>
              {cat.title}
            </option>
          ))}
        </select>
      </label>
      <label>
        Minimum Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
      {!isValidForm() && (
        <div className="validation-message">
          <p>Please enter a valid zip code and distance.</p>
        </div>
      )}
      <button type="submit" disabled={!isValidForm() || disabled}>
        Find Restaurant
      </button>
    </form>
  );
};

export default Form;
