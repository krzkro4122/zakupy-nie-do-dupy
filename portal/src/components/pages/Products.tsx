import { useEffect, useState } from "react";
import type { ProductResolved } from '../../../../shared/types/product';
import { BorderedSection } from "../Sections";
import { fetchProducts } from "../../utilities/products";

export const Products = () => {
    const [products, setProducts] = useState<ProductResolved[]>([]);

    useEffect(() => {
        if (products.length === 0) {
            (async () => {
                const fetchedProducts = await fetchProducts();
                if (fetchedProducts) {
                    setProducts(fetchedProducts);
                }
            })()
        }
    });

    const getProductList = () => {
        return products.map(product => {
            return (<li  key={product.id}>
                <h2>{product.name}</h2>
            </li>);
        });
    };

    return (
        <>
            <h1>Products</h1>
            {products.length > 0 && (
                <BorderedSection>
                    <ul>{getProductList()}</ul>
                </BorderedSection>
            )}
        </>
    );
};
