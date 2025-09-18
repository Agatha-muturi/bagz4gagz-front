import { useState } from "react";
import VideoModal from './Videomodal';
import {useCart} from '../context/cartcontext';

export default function Productcard({product}){
    const[show, setShow] =useState(false);
    const {addToCart}=useCart();

    return(
        <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img" />
      <div className="product-body">
        <h3>{product.name}</h3>
        <p className="desc">{product.description}</p>
        <div className="meta">
          <strong>Ksh {product.price}</strong>
        </div>
        <div className="actions">
          <button onClick={() => setShow(true)} className="btn">View Video</button>
          <button onClick={() => addToCart(product)} className="btn primary">Add to Cart</button>
        </div>
      </div>

      {show && <VideoModal videoUrl={product.videoUrl} onClose={() => setShow(false)} />}
    </div>
    )
}