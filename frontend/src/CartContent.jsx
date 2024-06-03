import React, { createContext, useState } from "react";
import { productsArray, getProductData } from "./ProductStore";

export const CartContent = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id) {
        const quantity = cartProducts.find(product => product.id === id)?.quantity;

        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 0) { // product is not in cart
            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    quantity: 1,
                },
            ]);
        } else { // product is in cart
            setCartProducts(
                cartProducts.map(
                    product =>
                        product.id === id // if condition
                            ? { ...product, quantity: product.quantity + 1 } // if statement is true
                            : product, // if statement is false
                ),
            );
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                        product.id === id // if condition
                            ? { ...product, quantity: product.quantity - 1 } // if statement is true
                            : product, // if statement is false
                ),
            );
        }
    }

    function deleteFromCart(id) {
        setCartProducts(cartProducts =>
            cartProducts.filter(currentProduct => currentProduct.id !== id),
        );
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.forEach(cartItem => {
            const productData = getProductData(cartItem.id);
            totalCost += productData.price * cartItem.quantity;
        });
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    };

    return (
        <CartContent.Provider value={contextValue}>
            {children}
        </CartContent.Provider>
    );
}

export default CartProvider;
