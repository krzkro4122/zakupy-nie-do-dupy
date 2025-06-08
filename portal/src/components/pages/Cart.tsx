import { useEffect, useState } from "react";
import { ManagedList } from "../ManagedList";
import type { CartItemResolved } from "../../../../shared/types/cart";
import { fetchCart, deleteCartItem, updateCartItem } from "../../utilities/cart";

import '../../styles/products.css'
import '../../styles/managedList.css'

// TODO
// Update product name from here

export const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItemResolved[]>([]);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const fetchedCartItems = await fetchCart();
            if (fetchedCartItems && cartItems.length === 0) {
                setCartItems(fetchedCartItems);
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

    return (
        <section className="products">
            <section className="products-header">
                <h1>Cart</h1>
                {selectedItemIds.length > 0 && <p>Selection count: {selectedItemIds.length}</p>}
            </section>
            {cartItems.length > 0 && (
                <ManagedList
                    items={cartItems}
                    selectedItemIds={selectedItemIds}
                    setSelectedItemIds={setSelectedItemIds}
                    updateItemAction={updateCartItemAction}
                    deleteItemAction={deleteCartItemAction}
                    manageItemsAction={manageProductsAction}
                />
            )}
        </section>
    );
};
