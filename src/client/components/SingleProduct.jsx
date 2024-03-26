import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles/SingleProduct.css';

export default function SingleProduct({ handleAddToCart, cart }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [addToCartText, setAddToCartText] = useState('Add to Cart');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const result = await response.json();
        setProduct(result.product);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product && cart) {
      setIsProductInCart(checkProductInCart(product.id));
    }
  }, [product, cart]);

  const checkProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleAddToCartClicked = () => {
    if (!isProductInCart) {
      handleAddToCart(product);
      setAddToCartText('Successfully added to cart');
      setIsButtonDisabled(true);
    } else {
      alert('This product is already in your cart.');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className='Single-Seed-Container'>
      <div className='left-div'>
      <div className='full-product-name'><h1>{product.plantvariety} {product.planttype}</h1></div>
        <div className='left-seed-card'>
          <img
            className='pic'
            src={'/' + product.imgurl}
            alt={product.planttype}
          />
          <div className='price-button-div'>
          <p className='price'>
            {product.seedcount} for ${product.price}
          </p>
          <button
            className='add-to-cart'
            onClick={handleAddToCartClicked}
            disabled={isButtonDisabled}
          >
            {addToCartText}
          </button></div>
        </div>
      </div>

      <div className='right-div'>
        <div className='summary'>
          <h1 className='headers'>Did you know?</h1>
          
          <p>{product.plantdescription}</p>
        </div>

        <div className='requirements'>
          <h1 className='headers'>Planting Requirements</h1>
          <p>{product.plantvariety} {product.planttype} matures in {product.maturationtime} and prefers {product.lightrequirements}.</p>
          <p>When mature each plant can be {product.matureheight} tall and {product.maturewidth} wide.</p>
        </div>

        <div className='instructions'>
          <h1 className='headers'>Planting Instructions</h1>
          <p>{product.plantinginstructions}</p>
          <p>Each seed should be planted at a {product.plantingdepth} depth, spaced {product.plantspacing} apart.</p>
        </div>
      </div>
    </main>
  );
}
