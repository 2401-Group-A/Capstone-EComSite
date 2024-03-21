import {useState} from 'react'
import './styles/cart.css'


export default function Cart({cart, setCart}) {
    const [price, setPrice] = useState(0);

    const handlePrice = () => {
        let cartTotal = 0;
        cart.map((product) => (
            cartTotal += product.amount * product.price
        ))
        setPrice(cartTotal);
    }

useEffect(() => {
    handlePrice()
})




  return (
    <article>
      {
        cart?.map((product) => (
            <div className="cart_box" key={product.id}> 
                <div className="cart_img">
                    <img src={product.imgurl} />
                    <h1 className="plant-type">{product.planttype}</h1>
                
                </div>
                <div className='button-box'>
                    <button> + </button>
                    <button>{product.amount}</button>
                    <button> - </button>
                </div>
                <div>
                    <span>{product.price}</span>
                    <button> Remove</button>
                </div>
            
            </div>
        ))}
        <div className='total'>
            <span> Total Price: </span>
            <span> ${price}</span>
        </div>
    </article>
  );
}
