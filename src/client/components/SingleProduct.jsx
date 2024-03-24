
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/SingleProduct.css";

export default function SingleProduct({ handleAddToCart }) {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <main className="Seed-Container">
      <div className='left-div'>
        <img className='pic' src={"/" + product.imgurl} alt={product.planttype} />
        <p className="price">{product.price}</p>
        <p className="quantity">Seeds per pack: {product.seedcount}</p>
        <button className='add-to-cart' onClick={() => handleAddToCart(product)}>Add to Cart</button>
      </div>

      <div className='right-div'>
        <div className='summary'>
          <h1 className='headers'>{product.planttype}</h1>
          <p>{product.plantvariety}</p>
          <p>{product.producetype}</p>
          <p>{product.plantdescription}</p>
        </div>

        <div className='requirements'>
          <h1 className='headers'>Planting Requirements</h1>
          <p>Maturation Time: {product.maturationtime}</p>
          <p>Light: {product.lightrequirements}</p>
          <p>Mature Height: {product.matureheight}</p>
          <p>Mature Width: {product.maturewidth}</p>
        </div>

        <div className='instructions'>
          <h1 className='headers'>Planting Instructions</h1>
          <p>{product.plantinginstructions}</p>
          <p>Spacing: {product.plantspacing}</p>
          <p>Depth: {product.plantingdepth}</p>
        </div>
      </div>
    </main>
  );
}
