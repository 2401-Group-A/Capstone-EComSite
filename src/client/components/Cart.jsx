import {useState} from 'react'


export default function Cart({cart, setCart}) {
    const [price, setPrice] = useState(0);
  return (
    <>
      {
        cart?.map((product) => (
            <div className="cart_box" key={product.id}> 
                <div className="cart_img">
                    <img src={product.imgurl} />
                    <h1 className="plant-type">{product.planttype}</h1>
                    <h1 className="plant-variety">{product.plantvariety}</h1>
                </div>
                <div>
                    <button> + </button>
                    <button> - </button>
                </div>
                <div>
                    <span>{product.price}</span>
                    <button> Remove</button>
                </div>
            
            </div>
        ))}
        <div>
            <span> Total Price: </span>
            <span> ${price}</span>
        </div>
    </>
  );
}
