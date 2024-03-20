import React, { useState, useEffect } from "react";
import "./styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  // Const for Search Bar
  const [searchQuery, setSearchQuery] = useState("");

  // Use Effect Start

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const result = await response.json();
          setProducts(result.products);
        } else {
          console.error("Error fetching products: ", response.statusText);
        }
      } catch (err) {
        console.error("Error loading seeds: ", err);
      }
    };

    fetchProducts();
  }, []);

  // Filter Function
  const filteredProducts = products.filter((product) =>
    product.planttype.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Return Start
  return (
    <>
      <div className="home-container">
        <aside className="filter-section">
          {/* Search Bar */}

          <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
            {" "}
            {/* Prevents form submission */}
            <input
              type="text"
              className="search-bar-input"
              placeholder="Search Products . . . "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Updates searchQuery based on user input
            />
          </form>

          {/* Price Scale Slider */}
          <h3>Price</h3>
          <input type="range" min="0" max="100" />

          {/* Seed Type Checkboxes */}
          <h3>Produce Type</h3>

          <div>
            <input type="checkbox" id="vegetable" name="vegetable" />
            <label htmlFor="vegetable">Vegetable</label>
          </div>

          <div>
            <input type="checkbox" id="herb" name="herb" />
            <label htmlFor="fruit">Herb</label>
          </div>

          {/* Seed Size Checkboxes */}
          <h3>Other Type</h3>

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
            {filteredProducts.map(
              (
                product // Renders filtered products by name only
              ) => (
                <article key={product.id}>
                  <div className="seed-card">
                    <img
                      className="product-img"
                      src={product.imgurl}
                      alt={product.planttype}
                    />
                    <h2>{product.planttype}</h2>
                    <p>{product.producetype}</p>
                    {/* <p>{product.price}</p> */}
                    <button>Add to Cart</button>
                  </div>
                </article>
              )
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
