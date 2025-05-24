import { useState } from "react";
import type { ProductResolved } from '../../../shared/types/product';

export const Products = () => {
    const [products, setProducts] = useState<ProductResolved>();

    return (
        <main className="w-full h-full p-4">
            <h1>Products</h1>

        </main>
    );
};
