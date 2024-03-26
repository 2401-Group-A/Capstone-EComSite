import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import { Link } from 'react-router-dom';

const Home = ({handleAddToCart, addToCart}) => {
  const [products, setProducts] = useState([]);
  
  
  const handleBothClicks = () => {
    handleAddToCart();
    addToCart();
  }




  // Const for Search Bar
  const [searchQuery, setSearchQuery] = useState('');
  // Product Type Checkboxes
  const [filterHerb, setFilterHerb] = useState(false);
  const [filterVegetable, setFilterVegetable] = useState(false);
  // Light requirement filters
  const [filterFullSun, setFilterFullSun] = useState(false);
  const [filterFullToPartSun, setFilterFullToPartSun] = useState(false);
  const [filterFullSunToPartShade, setFilterFullSunToPartShade] =
    useState(false);

  // Price Const
  const [maxPrice, setMaxPrice] = useState(100);

  // Reset Filters
  const resetFilters = () => {
    setSearchQuery('');
    setFilterHerb(false);
    setFilterVegetable(false);
    setFilterFullSun(false);
    setFilterFullToPartSun(false);
    setFilterFullSunToPartShade(false);
    setMaxPrice(100);
  };

  // Use Effect Start
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          setProducts(result.products);
        } else {
          console.error('Error fetching products: ', response.statusText);
        }
      } catch (err) {
        console.error('Error loading seeds: ', err);
      }
    };

    fetchProducts();
  }, []);

  // Filter Function
  const filteredProducts = products.filter((product) => {
    const matchesType =
      (filterHerb && product.producetype.toLowerCase() === 'herb') ||
      (filterVegetable && product.producetype.toLowerCase() === 'vegetable') ||
      (!filterHerb && !filterVegetable); // If no checkboxes are selected, show all products

    const matchesLightRequirements =
      (filterFullSun && product.lightrequirements.includes('Full Sun')) ||
      (filterFullToPartSun &&
        product.lightrequirements.includes('Full to Part Sun')) ||
      (filterFullSunToPartShade &&
        product.lightrequirements.includes('Full Sun to Part Shade')) ||
      (!filterFullSun && !filterFullToPartSun && !filterFullSunToPartShade); // If no light requirement filters are selected

    const matchesSearch =
      searchQuery.toLowerCase() === '' || //For empty search bar
      product.planttype.toLowerCase().includes(searchQuery.toLowerCase()) || //For Plant Type
      product.plantvariety.toLowerCase().includes(searchQuery.toLowerCase()); // For Plant Variety

    const matchesPrice = product.price <= maxPrice;

    return (
      matchesType && matchesSearch && matchesLightRequirements && matchesPrice
    );
  });

  // Return Start
  return (
    <>
      <div className='home-container'>
        <aside className='filter-section'>
          {/* Search Bar */}

          <form className='search-bar' onSubmit={(e) => e.preventDefault()}>
            {' '}
            {/* Prevents form submission */}
            <input
              type='text'
              className='search-bar-input'
              placeholder='Search Products . . . '
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Updates searchQuery based on user input
            />
          </form>

          {/* Price Scale Slider */}
          <h3>Price</h3>
          <span className='price-label'> $ </span>
          <input
            type='range'
            min='1'
            max='10'
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <span className='price-label'> $$$ </span>

          {/* Produce Type Checkboxes */}
          <h3>Produce Type</h3>
          <div>
            <input
              type='checkbox'
              id='vegetable'
              name='vegetable'
              checked={filterVegetable}
              onChange={() => setFilterVegetable(!filterVegetable)}
            />
            <label htmlFor='vegetable'>Vegetable</label>
          </div>

          <div>
            <input
              type='checkbox'
              id='herb'
              name='herb'
              checked={filterHerb}
              onChange={() => setFilterHerb(!filterHerb)}
            />
            <label htmlFor='herb'>Herb</label>
          </div>

          {/* Seed Light Requirments Checkboxes */}
          <h3>Light Requirements</h3>
          <div>
            <input
              type='checkbox'
              checked={filterFullSun}
              onChange={() => setFilterFullSun(!filterFullSun)}
            />
            <label>Full Sun</label>
          </div>
          <div>
            <input
              type='checkbox'
              checked={filterFullToPartSun}
              onChange={() => setFilterFullToPartSun(!filterFullToPartSun)}
            />
            <label>Full to Part Sun</label>
          </div>
          <div>
            <input
              type='checkbox'
              checked={filterFullSunToPartShade}
              onChange={() =>
                setFilterFullSunToPartShade(!filterFullSunToPartShade)
              }
            />
            <label>Full Sun to Part Shade</label>
          </div>

          {/* Reset Button */}
          <div className='reset-container'>
            <button onClick={resetFilters}>Clear All</button>
          </div>
        </aside>

        {/* Main Content where product cards are shown */}
        <section className='content-area'>
          <h1 className='seed-title'>
            Spring is here!
            <br />
            Check out our current selection of seeds!
          </h1>

          <div className='seed-container'>
            {filteredProducts.map(
              (
                product // Renders filtered products by name only
              ) => (
                <article key={product.id}>
                    <div className='seed-card'>
                  <Link className='single-link' to={`/products/${product.id}`}>
                      <img
                        className='product-img'
                        src={product.imgurl}
                        alt={product.planttype}
                      />
                      <h1 className='plant-variety'>{product.plantvariety}</h1>
                      <h1 className='plant-type'>{product.planttype}</h1>
                      {/* <p className='produce-type'>{product.producetype}</p> */}
                      <p>{product.seedcount} for ${product.price}</p>
                  </Link>
                      <button className='add-cart-button' onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </button>
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
