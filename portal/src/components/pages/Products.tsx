import { useEffect, useState } from "react";
import type { ProductResolved } from '../../../../shared/types/product';
import { deleteProduct, fetchProducts, postProduct, updateProduct } from "../../utilities/products";
import { InlineForm } from "../InlineForm";

import '../../styles/products.css'
import { ManagedList } from "../ManagedList";

export const Products = () => {
    const [products, setProducts] = useState<ProductResolved[]>([]);

    useEffect(() => {
        (async () => {
            const fetchedProducts = await fetchProducts();
            if (fetchedProducts) {
                setProducts(fetchedProducts);
            }
        })()
    }, []);

    const addProductAction = async (formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (productName) {
            const addedProduct = await postProduct({ name: `${productName}` });
            if (addedProduct) {
                setProducts([...products, addedProduct]);
            }
        }
    }

    const deleteProductAction = async (id: string) => {
        if (id) {
            const deleteWasSuccessful = await deleteProduct(id);
            if (deleteWasSuccessful) {
                setProducts(products.filter((product) => product.id !== id));
            }
        }
    }

    const updateProductAction = async (id: string, formData: FormData) => {
        const productName = formData.get("resizing-input");
        if (id && productName) {
            const updatedProduct = await updateProduct(id, { name: `${productName}` });
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

    const manageProductsAction = async (formData: FormData) => {
        const productIds = formData.get("managed-list-form-select")
        console.log(productIds);
    }

    return (
        <section className="products">
            <section className="products-header">
                <h1>Products</h1>
            </section>
            {products.length > 0 && (
                <ManagedList
                    items={products}
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
