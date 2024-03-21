import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


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

                        <div className='product-card'>
                            <img className='product'src={product.imgurl}/>
                            <h2>{product.plantvariety}</h2>
                        </div>
                    </article>
                
        </main>
        
        
        </>
        
    )
}