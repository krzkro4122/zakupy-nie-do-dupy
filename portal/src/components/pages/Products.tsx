import { useEffect, useState } from "react";
import type { ProductResolved } from '../../../../shared/types/product';
import { deleteProduct, fetchProducts, postProduct, updateProduct } from "../../utilities/products";
import type { UUIDTypes } from "uuid";
import { InlineForm } from "../InlineForm";

import '../../styles/products.css'

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
        const productName = formData.get("input");
        if (productName) {
            const addedProduct = await postProduct({ name: `${productName}` });
            if (addedProduct) {
                setProducts([...products, addedProduct]);
            }
        }
    }

    const deleteProductAction = async (id: UUIDTypes) => {
        if (id) {
            const deleteWasSuccessful = await deleteProduct(id);
            if (deleteWasSuccessful) {
                setProducts(products.filter((product) => product.id !== id));
            }
        }
    }

    const updateProductAction = async (id: UUIDTypes, formData: FormData) => {
        const productName = formData.get("input");
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

    const getProductList = () => {
        return products.map(product => {
            return (<li key={product.id}>
                <InlineForm
                    action={(formData) => updateProductAction(product.id, formData)}
                    initialDisplayValue={product.name}
                    keepInitialValueAsInput={true}
                />
                <button type="button" onClick={() => deleteProductAction(product.id)} className="delete-button">X</button>
            </li>);
        });
    };

    return (
        <section className="products">
            <section className="products-header">
                <h1>Products</h1>
            </section>
            {products.length > 0 && (
                <ul>{getProductList()}</ul>
            )}
            <InlineForm
                initialDisplayValue="Add product"
                action={addProductAction}
            />
        </section>
    );
};
