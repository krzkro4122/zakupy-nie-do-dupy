import { deleteProduct, fetchProducts, postProduct, updateProduct } from "../../utilities/products";
import { useEffect, useState } from "react";
import { InlineForm } from "../InlineForm";
import { ManagedList } from "../ManagedList";
import type { ProductResolved } from "../../../../shared/types/product";

import '../../styles/products.css'
import '../../styles/managedList.css'

export const ShoppingList = () => {
    const [shoppingList, setShoppingList] = useState<ProductResolved[]>([]);
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const fetchedProducts = await fetchProducts();
            if (fetchedProducts) {
                setShoppingList(fetchedProducts);
            }
        })()
    }, []);

    const addProductAction = async (formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (productName) {
            const addedProduct = await postProduct({ name: `${productName}` });
            if (addedProduct) {
                setShoppingList([...shoppingList, addedProduct]);
            }
        }
    }

    const deleteProductAction = async (id: string) => {
        if (id) {
            const deleteWasSuccessful = await deleteProduct(id);
            if (deleteWasSuccessful) {
                setShoppingList(shoppingList.filter((product) => product.id !== id));
            }
        }
    }

    const updateProductAction = async (id: string, formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (id && productName) {
            const updatedProduct = await updateProduct(id, { name: `${productName}` });
            if (updatedProduct) {
                setShoppingList(shoppingList.map((product) => {
                    if (product.id === updatedProduct.id) {
                        return updatedProduct;
                    }
                    return product;
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
                <h1>Shopping List</h1>
                {selectedItemIds.length > 0 && <p>Selection count: {selectedItemIds.length}</p>}
            </section>
            {shoppingList.length > 0 && (
                <ManagedList
                    items={shoppingList}
                    selectedItemIds={selectedItemIds}
                    setSelectedItemIds={setSelectedItemIds}
                    updateItemAction={updateProductAction}
                    deleteItemAction={deleteProductAction}
                    manageItemsAction={manageProductsAction}
                />
            )}
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
