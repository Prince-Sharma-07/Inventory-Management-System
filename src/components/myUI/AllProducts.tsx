"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../../generated/prisma";
import { GET_PRODUCTS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import ProductCard from "../cards/ProductCard";
import Link from "next/link";

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts() {
      const data: {
        AllProducts: Product[];
      } = await gqlClient.request(GET_PRODUCTS);
      setProducts(data.AllProducts || []);
    }
    getProducts();
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 w-full">
      <h1 className="text-4xl text-center">All Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={"/product/" + product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
