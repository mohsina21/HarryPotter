import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Cards.css";

const Cards = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input

  useEffect(() => {
    axios
      .get("https://hp-api.onrender.com/api/characters")
      .then((res) => {
        const filteredItems = (res.data || []).filter((character) => character.image); // Remove characters without images
        setItems(filteredItems);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // Filter items based on search input
  const filteredItems = items.filter((character) =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="items-container">
        {filteredItems.length > 0 ? (
          filteredItems.map(({ name, image, id, alternate_names }) => {
            const uniqueKey = id || name.replace(/\s+/g, "-"); // Ensure unique key

            return (
              <section key={uniqueKey} className="box">
                <img src={image} alt={name} className="character-image" />
                <section className="info">
                  <p className="character-name">{name}</p>
                  {alternate_names.length > 0 && (
                    <p className="alternate-names">
                      <strong>Also known as:</strong> {alternate_names.join(", ")}
                    </p>
                  )}
                </section>
              </section>
            );
          })
        ) : (
          <p className="loading-text">No characters found...</p>
        )}
      </div>
    </div>
  );
};

// SearchBar Component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search characters..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Cards;
