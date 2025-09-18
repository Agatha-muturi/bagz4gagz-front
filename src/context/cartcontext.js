import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart(){
    return useContext(CartContext);
}
export function CartProvider({children}) {
    const [items, setItems] =useState([]);
    const addToCart = (product, qty = 1) =>{
        setItems(prev=>{
            const idx =prev.findIndex(i=>i.product.id=== product.id);
            if (idx>= 0){
                const copy = [...prev];
                copy[idx].qty+=qty;
                return copy;
            }
            return[{product,qty}, ...prev];
        });
    };
    const removeFromCart =(productId)=> {
        setItems(prev=>prev.filter(i=>i.product.id !==productId));
    };
    const updateQty = (productId,qty)=>{
        setItems(prev.map(i=> i.product.id=== productId ? {...i, qty}:i));
    };
    const clearCart= ()=>setItems([]);
    const total = items.reduce((s, it) =>s=it.product.price8it.qty, 0);

    return(
         <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total }}>
      {children}
    </CartContext.Provider>
    );
}