import React from "react";
import { Product } from "../../../generated/prisma";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card shadow-card dark:bg-base-100 h-130">
      <figure>
        <img
          src={product.imageUrl}
          alt="product_image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.title}
          <div className="badge badge-secondary px-2">NEW</div>
        </h2>
        <p className="line-clamp-3">
          {product.description}
        </p>
        <span>Price: ${product.price}</span>
        <div className="card-actions justify-end">
          <div className="badge border-white border px-2 min-w-10 rounded-2xl">{product.category}</div>
          <div className="badge border-white border px-2 min-w-10 rounded-2xl">{product.stock} stocks</div>
        </div>
      </div>
    </div>
  );
}
