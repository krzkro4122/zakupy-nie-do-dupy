import { deleteCartItem, updateCartItem, fetchCartItems } from "../../utilities/cart";
import { LoadingState } from "../LoadingState";
import { ManagedList } from "../ManagedList";
import { useEffect, useState } from "react";
import type { CartItemResolved } from "../../types/cart";

import '../styles/products.css'
import '../styles/managedList.css'

// TODO
// Update product name from here

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

    const deleteCartItemAction = async (id: string) => {
        if (id) {
            const deleteWasSuccessful = await deleteCartItem(id);
            if (deleteWasSuccessful) {
                setCartItems(cartItems.filter((cartItem) => cartItem.id !== id));
            }
        }
    }

    const updateCartItemAction = async (id: string, formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (id && productName) {
            const updatedCartItem = await updateCartItem(id, { quantity: 1, isBought: false, productId: `${productName}`, cartId: "1" });
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

    const manageProductsAction = async (formData: FormData) => {
        const productIds = formData.get("managed-list-form-select")
        console.log(productIds);
    }

    const getProductList = () => {
        return (
            isLoading ? (
                <LoadingState />
            ) : (
                cartItems.length > 0 ? (
                    <ManagedList
                        items={cartItems}
                        selectedItemIds={selectedItemIds}
                        setSelectedItemIds={setSelectedItemIds}
                        updateItemAction={updateCartItemAction}
                        deleteItemAction={deleteCartItemAction}
                        manageItemsAction={manageProductsAction}
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
            {getProductList()}
        </section>
    );
};
