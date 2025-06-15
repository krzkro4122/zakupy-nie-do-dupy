import { deleteCartItem, updateCartItem, fetchCartItems } from "../../utilities/cart";
import { getUser } from "../../utilities/authentication";
import { LoadingState } from "../LoadingState";
import { ManagedList } from "../ManagedList";
import { updateProduct } from "../../utilities/products";
import { useEffect, useState } from "react";
import type { CartItemResolved } from "../../types/cart";
import type { Id } from "../../types/common";
import { v4 as uuidv4 } from 'uuid';

import '../styles/products.css'
import '../styles/managedList.css'

export const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItemResolved[]>([]);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (cartItems.length === 0 && isLoading) {
                try {
                    const fetchedCartItems = await fetchCartItems();
                    setIsLoading(false);
                    if (fetchedCartItems && fetchedCartItems.length > 0) {
                        setCartItems(fetchedCartItems);
                    }
                } catch (error) {
                    setIsLoading(false);
                    console.error(error);
                }
            }
        })()
    }, []);

    const deleteCartItemAction = async (id: Id) => {
        if (id) {
            const deleteWasSuccessful = await deleteCartItem(id);
            if (deleteWasSuccessful) {
                setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
            }
        }
    }

    const modifyCartItemQuantity = async (id: Id, quantity: number) => {
        const cartItem = cartItems.find((cartItem) => cartItem.id === id);
        if (cartItem) {
            const updatedCartItem = await updateCartItem(id, { ...cartItem, quantity: cartItem.quantity + quantity });
            if (updatedCartItem) {
                setCartItems(cartItems.map((cartItem) => {
                    if (cartItem.id === updatedCartItem.id) {
                        return updatedCartItem;
                    }
                    return cartItem;
                }));
            }
        }
    }

    const increaseCartItem = async (id: Id) => {
        modifyCartItemQuantity(id, 1);
    }

    const decreaseCartItem = async (id: Id) => {
        modifyCartItemQuantity(id, -1);
    }

    const updateProductAction = async (id: Id, formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (id && productName) {
            const user = getUser();
            if (user) {
                const cartItem = cartItems.find((cartItem) => cartItem.id === id);
                if (cartItem) {
                    const updatedProduct = await updateProduct(cartItem.expand.product.id, { name: `${productName}`, user: user.id });
                    if (updatedProduct) {
                        setCartItems(cartItems.map((cartItem) => {
                            if (cartItem.expand.product.id === updatedProduct.id) {
                                return {
                                    ...cartItem,
                                    expand: {
                                        ...cartItem.expand,
                                        product: updatedProduct
                                    }
                                };
                            }
                            return cartItem;
                        }));
                    }
                }
            }
        }
    }

    const getCartItemList = () => {
        return (
            isLoading ? (
                <LoadingState />
            ) : (
                cartItems.length > 0 ? (
                    <ManagedList
                        items={cartItems.map(item => ({
                            id: item.id,
                            name: item.expand.product.name,
                            created: item.created,
                            updated: item.updated,
                            quantity: item.quantity
                        }))}
                        selectedItemIds={selectedItemIds}
                        setSelectedItemIds={setSelectedItemIds}
                        updateItemAction={updateProductAction}
                        itemControls={[
                            (id: Id) => <button type="button" key={uuidv4()} onClick={() => increaseCartItem(id)} className="item-control">+</button>,
                            (id: Id) => <input type="button" key={uuidv4()} onChange={() => decreaseCartItem(id)} value={cartItems.find((item) => item.id === id)?.quantity} className="item-control"></input>,
                            (id: Id) => <button type="button" key={uuidv4()} onClick={() => decreaseCartItem(id)} className="item-control">-</button>,
                            (id: Id) => <button type="button" key={uuidv4()} onClick={() => deleteCartItemAction(id)} className="item-control delete">🚮</button>
                        ]}
                    />
                ) : (
                    <div className="no-products">
                        <p className="no-products-text">No products in cart</p>
                    </div>
                )
            )
        );
    }

    return (
        <section className="products">
            <section className="products-header">
                <h1>Cart</h1>
                {selectedItemIds.length > 0 && <p>Selection count: {selectedItemIds.length}</p>}
            </section>
            {getCartItemList()}
        </section>
    );
};
