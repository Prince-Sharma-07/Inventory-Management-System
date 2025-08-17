"use client";
import { useUserContext } from "@/contexts/UserContextProvider";
import { GET_PRODUCTS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "../../../generated/prisma";
import ProductCard from "../cards/ProductCard";
import { AddProductBtn } from "./AddProductBtn";

export default function AllProducts({ className }: { className: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getProducts() {
      const data: {
        AllProducts: Product[];
      } = await gqlClient.request(GET_PRODUCTS);
      setProducts(data.AllProducts || []);
      setLoading(false);
    }
    getProducts();
    
  }, []);

  if (loading) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-3 border-gray-800 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-sm text-gray-400 font-medium">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full py-3 sm:py-4 md:py-5 lg:py-6">
      <h1 className="flex text-4xl text-center justify-between items-center">
        <span className="flex gap-3 items-center text-2xl font-medium">
          <Image src={"/box.png"} height={30} width={30} alt="products" />{" "}
          Products
        </span>{" "}
        {user?.role !== "staff" && user && <AddProductBtn />}
      </h1>
      <div className={`${className} gap-6`}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
