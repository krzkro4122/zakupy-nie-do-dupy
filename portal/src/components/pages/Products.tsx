import { deleteProduct, fetchProducts, postProduct, updateProduct } from "../../utilities/products";
import { postCartItem } from "../../utilities/cart";
import { InlineForm } from "../InlineForm";
import { LoadingState } from "../LoadingState";
import { ManagedList } from "../ManagedList";
import { useEffect, useState } from "react";
import type { ProductResolved } from '../../types/product';
import { getUser } from "../../utilities/authentication";
import type { Id } from "../../types/common";
import { v4 as uuidv4 } from 'uuid';

import '../styles/products.css'
import '../styles/managedList.css'

export const Products = () => {
    const [products, setProducts] = useState<ProductResolved[]>([]);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            if (products.length === 0 && isLoading) {
                const fetchedProducts = await fetchProducts();
                setIsLoading(false);
                if (fetchedProducts && fetchedProducts.length > 0) {
                    setProducts(fetchedProducts);
                }
            }
        })()
    }, []);

    const addProductAction = async (formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (productName) {
            const user = getUser();
            if (user) {
                const addedProduct = await postProduct({ name: `${productName}`, user: user.id });
                if (addedProduct) {
                    setProducts([...products, addedProduct]);
                }
            }
        }
    }

    const deleteProductAction = async (id: Id) => {
        if (id) {
            const deleteWasSuccessful = await deleteProduct(id);
            if (deleteWasSuccessful) {
                setProducts(products.filter((product) => product.id !== id));
            }
        }
    }

    const updateProductAction = async (id: Id, formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (productName) {
            const user = getUser();
            if (user) {
                const updatedProduct = await updateProduct(id, { name: `${productName}`, user: user.id });
                if (updatedProduct) {
                    setProducts(products.map((product) => {
                    if (product.id === updatedProduct.id) {
                        return updatedProduct;
                    }
                        return product;
                    }));
                }
            }
        }
    }

    const addToCartAction = async (id: Id) => {
        await postCartItem({ product: id, quantity: 1, isBought: false, cart: "" });
    }

    const getProductList = () => {
        return isLoading ? (
            <LoadingState />
        ) : (
            products.length > 0 ? (
                <ManagedList
                    items={products}
                    selectedItemIds={selectedItemIds}
                    setSelectedItemIds={setSelectedItemIds}
                    updateItemAction={updateProductAction}
                    itemControls={[
                        (id: Id) => <button type="button" key={uuidv4()} onClick={() => addToCartAction(id)} className="item-control">🛒</button>,
                        (id: Id) => <button type="button" key={uuidv4()} onClick={() => deleteProductAction(id)} className="item-control delete">🚮</button>,
                    ]}
                />
            ) : (
                <div className="no-products">
                    <p className="no-products-text">No products</p>
                </div>
            )
        )
    }

    return (
        <section className="products">
            <section className="products-header">
                <h1>Products</h1>
                {selectedItemIds.length > 0 && <p>Selection count: {selectedItemIds.length}</p>}
            </section>
            {getProductList()}
            <div className="product-controls-container">
                <InlineForm
                    initialDisplayValue="Add product"
                    action={addProductAction}
                    extraFormClassNames="add-product"
                    extraInputClassNames="resizing-input-bordered"
                    extraButtonClassNames="button-bordered"
                />
            </div>
        </section>
    );
};
