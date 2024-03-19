import React, { useState, useEffect } from "react";
import "./styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) { // Ensure the request was successful
          const result = await response.json();
          setProducts(result.products); // Adjusted to match the API response structure
        } else {
          console.error("Error fetching products: ", response.statusText); // More descriptive error logging
        }
      } catch (err) {
        console.error("Error loading seeds: ", err);
      }
    };
  
    fetchProducts(); // Call the function to fetch products
  }, []);

  return (
    <>
      <div className="home-container">
      <aside className="filter-section">
          {/* Start: Placehodler content for filter options */}

          {/* Price Scale Slider */}
          <h3>Price</h3>
          <input type="range" min="0" max="100" />

          {/* Seed Type Checkboxes */}
          <h3>Seed Type</h3>

          <div>
            <input type="checkbox" id="vegetable" name="vegetable" />
            <label htmlFor="vegetable">Vegetable</label>
          </div>

          <div>
            <input type="checkbox" id="fruit" name="fruit" />
            <label htmlFor="fruit">Herb</label>
          </div>

          {/* Seed Size Checkboxes */}
          <h3>Seed Size</h3>

          <div>
            <input type="checkbox" />
            <label htmlFor="vegetable">Type</label>
          </div>

          <div>
            <input type="checkbox" />
            <label htmlFor="fruit">Type</label>
          </div>

          {/* Seed Exposure Checkboxes */}
          <h3>Seed Exposure</h3>

          <div>
            <input type="checkbox" />
            <label>Full Sun</label>
          </div>

          <div>
            <input type="checkbox" />
            <label>Part Sun</label>
          </div>

          <div>
            <input type="checkbox" />
            <label>Sun or Shade</label>
          </div>

          <div>
            <input type="checkbox" />
            <label>Full Shade</label>
          </div>
        </aside>

        {/* Main Content where product cards are shown */}
        <section className="content-area">
          <h1 className="seed-title">Our Seeds!</h1>

          <div className="seed-container">
            {products.map((product) => ( 
              <article key={product.id}>
                <div className="seed-card">
                  
                  <img className="product-img" src={product.imgurl} alt={product.planttype} />
                  <h2>{product.planttype}</h2>
                  <p>Description: {product.plantdescription}</p>
                  
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
