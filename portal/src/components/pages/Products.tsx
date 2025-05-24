import { useEffect, useState } from "react";
import type { ProductResolved } from '../../../../shared/types/product';
import { deleteProduct, fetchProducts, postProduct, updateProduct } from "../../utilities/products";
import { InlineForm } from "../InlineForm";
import { Button } from "../Button";
import type { UUIDTypes } from "uuid";

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
            return (<li key={product.id} className="flex items-center gap-5 justify-between py-1 pr-2 hover:bg-gray-800 border-b-1 border-gray-500">
                <InlineForm
                    action={(formData) => updateProductAction(product.id, formData)}
                    initialDisplayValue={product.name}
                    keepInitialValueAsInput={true}
                />
                <button type="button" onClick={() => deleteProductAction(product.id)} className="text-xs hover:bg-red-700 hover:text-black w-fit h-fit px-1 rounded-xs font-mono">X</button>
            </li>);
        });
    };

    return (
        <>
            <section className="flex flex-row gap-4">
                <h1>Products</h1>
                <InlineForm
                    initialDisplayValue="Add product"
                    action={addProductAction}
                />
            </section>
            {products.length > 0 && (
                <section>
                    <ul className="flex flex-col w-max">{getProductList()}</ul>
                </section>
            )}
        </>
    );
};
