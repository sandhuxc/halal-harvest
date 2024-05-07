import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        // Check if the product is already in the cart by its unique identifier (e.g., id)
        const isProductInCart = cartItems.some(item => item.id === product.id);

        if (!isProductInCart) {
            // If the product is not in the cart, add it
            setCartItems([...cartItems, product]);
        } else {
            // If the product is already in the cart, you can choose to ignore it or show a message
            // You might want to implement some user feedback to indicate that the product is already in the cart
            console.log("Product is already in the cart");
        }
    };

    const removeFromCart = (productId) => {
        setCartItems(cartItems.filter(item => item.id !== productId));
    };

    const emptyCart = ()=>{
        setCartItems([])
    }

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
