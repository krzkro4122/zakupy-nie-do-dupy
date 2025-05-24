import { useEffect, useState } from "react";
import type { ProductResolved } from '../../../../shared/types/product';
import { fetchProducts, postProduct } from "../../utilities/products";
import { InlineForm } from "../InlineForm";

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

    const getProductList = () => {
        return products.map(product => {
            return (<li key={product.id} className="w-40">
                <h2>{product.name}</h2>
            </li>);
        });
    };

    return (
        <>
            <section className="flex flex-row gap-4">
                <h1>Products</h1>
                <InlineForm initialDisplayValue="Add product" action={async (formData) => {
                    const productName = formData.get("input");
                    if (productName) {
                        const addedProduct = await postProduct({ name: `${productName}` });
                        if (addedProduct) {
                            setProducts([...products, addedProduct]);
                        }
                    }
                }}></InlineForm>
            </section>
            {products.length > 0 && (
                <section>
                    <ul>{getProductList()}</ul>
                </section>
            )}
        </>
    );
};
