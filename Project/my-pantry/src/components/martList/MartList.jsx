import React from "react";

const MartList = ({ supermarkets }) => {
  return (
    <div className="supermarket-list">
      <h2>Nearby Supermarkets:</h2>
      <ul>
        {supermarkets.map((supermarket) => (
          <li key={supermarket.place_id}>{supermarket.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MartList;
