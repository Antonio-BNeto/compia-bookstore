import React from "react";
import { useParams } from "react-router-dom";

function ProductDetailPage() {
    const { id } = useParams();
    return <h2>📖 Detalhes do Produto #{id}</h2>
}

export default ProductDetailPage