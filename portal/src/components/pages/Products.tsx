import { useState } from "react";
import type { ProductResolved } from '../../../../shared/types/product';

export const Products = () => {
    const [products, setProducts] = useState<ProductResolved>();

    return (
        <>
            <h1>Products</h1>
        </>
    );
};
