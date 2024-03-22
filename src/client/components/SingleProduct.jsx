import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./styles/SingleProduct.css";


export default function SingleProduct() {
    const [product, setProduct] = useState(null);
    const { id } = useParams()
    
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
        };
        fetchProduct();
    }, []);

    if (!product) {
        return <div>Loading...</div>
    } 

    return (
        <>
        <main className="Seed-Conatiner">
                    <article key={product.id}>

                        <div className='left-div'>
                            <img className='product'src={product.imgurl}/>
                            <p className="price">{product.price}</p>
                            {/* <p className="quantity">{product.quantity}</p> */}
                            {/* <button>Add to Cart</button> */}
                        </div>

                        <div className='right-div'>

                            <div className='summary'>

                            <h1>{product.planttype}</h1>
                            <p>{product.plantvariety}</p>
                            <p>{product.producetype}</p>
                            <p>{product.plantdescription}</p>

                            </div>

                            <div className='instructions'>
                                <h2>Planting Instuctions</h2>
                                <p>{product.plantinginstructions}</p>
                                <p>Spacing: {product.plantspacing}</p>
                                <p>Depth: {product.plantingdepth}</p>
                                


                            </div>
                            <div className='requirements'>
                            <h2>Planting Requirements</h2>
                            <p>Maturation Time: {product.maturationtime}</p>
                            <p>Light: {product.lightrequirements}</p>
                            <p>Mature Height: {product.matureheight}</p>
                            <p>Mature Width: {product.maturewidth}</p>
                            

                            </div>



                        </div>
                        
                    </article>
                
        </main>
        
        
        </>
        
    )
}