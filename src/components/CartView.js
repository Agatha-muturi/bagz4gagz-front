// src/components/CartView.js
import React from "react";
import { useCart } from "../context/cartcontext";
import { Link } from "react-router-dom";

export default function CartView() {
  const { items, updateQty, removeFromCart, total } = useCart();

  if (!items.length) return <div><p>Your cart is empty.</p><Link to="/products">Browse products</Link></div>;

  return (
    <div>
      <h2>Your Cart</h2>
      <div>
        {items.map(it => (
          <div key={it.product.id} style={{ display:"flex", gap:16, alignItems:"center", marginBottom:12 }}>
            <img src={it.product.image} alt="" style={{ width:80, height:80, objectFit:"cover", borderRadius:6 }} />
            <div style={{ flex:1 }}>
              <strong>{it.product.name}</strong>
              <div>Ksh {it.product.price}</div>
            </div>
            <input type="number" value={it.qty} min={1} style={{ width:70 }} onChange={(e) => updateQty(it.product.id, Number(e.target.value))} />
            <button onClick={() => removeFromCart(it.product.id)}>Remove</button>
          </div>
        ))}
      </div>

      <h3>Total: Ksh {total}</h3>
      <Link to="/checkout"><button>Proceed to Checkout</button></Link>
    </div>
  );
}
