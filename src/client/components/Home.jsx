import React, { useState, useEffect } from "react";
import "./styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planttype,
            producetype,
            imgurl,
            price,
          }),
        });
        // const result = await response.json();
  
        // setProducts(result);
        
      } catch (err) {
        console.log("Error loading seeds");
      };
      Home();
    })
  };


  return (
    <>
      <div className="home-container">
        {/* Filter section on left side of screen */}
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

        {/* Main Content where seed cards are shown */}
        <section className="content-area">
          <h1 className="seed-title">Our Seeds!</h1>
          {/* Start of Old container */}
          {/* <div className='seed-container'>
        <div className="seed-card">Seed card</div>
  

        </div> */}
          {/* End of old container */}

          {/* Seed Card API Container Practice */}
          <div className="product-container">
            {products.map((products) => {
              return (
                <article key={products.id}>
                  <div className="product-card">
                    <img className="product-img" src={productss.imgurl} />
                    <h2>{products.planttype}</h2>
                    <p>Description: {products.plantdescription}</p>
                    {/* <button onClick={() => navigate(/books/${books.id})}> See Details</button> */}
                    {/* <Reserve token={token} books={books}/> */}
                  </div>
                </article>
              );
            })}
          </div>

          {/* End Card API Container Practice  */}
        </section>
      </div>
    </>
  );
};

export default Home;
