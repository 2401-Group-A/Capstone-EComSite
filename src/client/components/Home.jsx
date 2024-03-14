import React from 'react';

import './Home.css'; 

function Home() {
  return (
    <>
  
    <div className='navbar-placeholder'>
      <h1>Navbar</h1>
    </div>
    
    <div className='home-container'>

      {/* Filter section on left side of screen */}
      <aside className='filter-section'>

        {/* Start: Placehodler content for filter options */}

        {/* Price Scale Slider */}
        <h3>Price</h3>
        <input type="range" min="0" max="100"/> 

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
      <section className='content-area'>
        <h1 className='seed-title'>Our Seeds!</h1>

        <div className='seed-container'>


        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>
        <div className="seed-card">Seed card</div>

        </div>

      </section>
    </div>
    </>

  );
}

export default Home;