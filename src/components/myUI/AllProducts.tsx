"use client";
import { useUserContext } from "@/contexts/UserContextProvider";
import { GET_PRODUCTS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "../../../generated/prisma";
import ProductCard from "../cards/ProductCard";
import { AddProductBtn } from "./AddProductBtn";

export default function AllProducts({ className }: { className: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUserContext();

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
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full py-3 sm:py-4 md:py-5 lg:py-6">
      <h1 className="flex text-4xl text-center justify-between items-center">
        <span className="flex gap-3 items-center text-2xl font-medium">
          <Image src={"/box.png"} height={30} width={30} alt="products" />{" "}
          Products
        </span>{" "}
        {user?.role !== "staff" && user && <AddProductBtn />}
      </h1>
      <div className={`flex flex-col gap-4`}>
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
}
