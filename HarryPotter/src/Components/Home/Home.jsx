import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>Welcome to the Harry Potter Universe</h1>
      <p>Explore the characters from the wizarding world!</p>
      <button onClick={() => navigate("/cards")}>View Characters</button>
    </div>
  );
};

export default Home;