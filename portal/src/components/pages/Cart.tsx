import { deleteCartItem, updateCartItem, fetchCartItems } from "../../utilities/cart";
import { FaDeleteLeft, FaMinus, FaPlus } from "react-icons/fa6";
import { getUser } from "../../utilities/authentication";
import { ItemControl } from "../ItemControl";
import { LoadingState } from "../LoadingState";
import { ManagedList } from "../ManagedList";
import { updateProduct } from "../../utilities/products";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import type { CartItemResolved } from "../../types/cart";
import type { Id } from "../../types/common";

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
                    console.log(fetchedCartItems);
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
            const updatedCartItem = await updateCartItem(id, { ...cartItem, quantity: Math.max(cartItem.quantity + quantity, 1) });
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
                cartItems && cartItems.length > 0 ? (
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
                            (id: Id) => <ItemControl key={uuidv4()} id={id} child={<FaPlus color="var(--text-color)" />} onClick={increaseCartItem} />,
                            (id: Id) => <input type="button" tabIndex={-1} key={uuidv4()} onChange={() => decreaseCartItem(id)} value={cartItems.find((item) => item.id === id)?.quantity} className="item-control"></input>,
                            (id: Id) => <ItemControl key={uuidv4()} id={id} child={<FaMinus color="var(--text-color)" />} onClick={decreaseCartItem} />,
                            (id: Id) => <ItemControl key={uuidv4()} id={id} child={<FaDeleteLeft color="var(--text-color)" />} onClick={deleteCartItemAction} />,
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
            {getCartItemList()}
        </section>
    );
};
