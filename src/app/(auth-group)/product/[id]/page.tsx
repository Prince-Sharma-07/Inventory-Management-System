// import ProductSaleChart from "@/components/myUI/ProductSaleChart";
// import { SaleProductBtn } from "@/components/myUI/SaleProductBtn";
// import { GET_PRODUCT } from "@/lib/gql/queries";
// import gqlClient from "@/lib/services/graphQL";
// import { ProductWithSales } from "@/types";
// import Image from "next/image";
// import { notFound } from "next/navigation";

// type Param = Promise<{
//   id: string;
// }>;

// export default async function page({ params }: { params: Param }) {
//   const { id } = await params;

//   let product;
//   try {
//     const res: {
//       product: ProductWithSales;
//     } = await gqlClient.request(GET_PRODUCT, { id });
//     if (res?.product) {
//       product = res.product;
//     } else {
//       notFound();
//     }
//   } catch (err) {
//     console.log(err);
//     notFound();
//   }

//   const chartData =
//     product?.sales.map((sale) => {
//       const date = new Date(Number(sale.createdAt));
//       const format =
//         date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
//       const quantity = sale.quantity;
//       const obj = {
//         date: format,
//         quantity,
//       };
//       return obj;
//     }) || [];
//   return (
//     <div className="w-full h-[85vh] min-h-[85vh] p-6 ">
//       <div className="flex justify-between h-[80%] w-full">
//         <div className="w-[35%] h-full p-4">
//           <div className="relative h-full w-full">
//             <Image fill src={product.imageUrl} alt={"product_image"} />
//           </div>
//         </div>
//         <div className="w-[25%] p-4 flex flex-col gap-4 items-center justify-between">
//           <div className="flex flex-col gap-4 items-center">
//           <h1 className="text-4xl font-bold">{product.title}</h1>
//           <p className="text-lg">Description: {product.description}</p>
//           <span>Price: ${product.price}</span>
//           <span>Stocks: {product.stock}</span>
//           <span className="border border-white rounded-2xl w-fit min-w-10 py-0.5 px-3">
//             {product.category}
//           </span>
//           </div>
//            <SaleProductBtn product={product} />
//         </div>

//         <div className="flex flex-col gap-4 w-[40%] items-center">

//           <ProductSaleChart chartData={chartData} />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import DeleteProdBtn from "@/components/myUI/DeleteProdBtn";
import { EditProductBtn } from "@/components/myUI/EditProductBtn";
import ProductSaleChart from "@/components/myUI/ProductSaleChart";
import { SaleProductBtn } from "@/components/myUI/SaleProductBtn";
import { useUserContext } from "@/contexts/UserContextProvider";
import { GET_PRODUCT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import { ProductWithSales } from "@/types";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  Package,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Param = Promise<{
  id: string;
}>;

export default function Page({ params }: { params: Param }) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductWithSales | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { id } = await params;
        const res: {
          product: ProductWithSales;
        } = await gqlClient.request(GET_PRODUCT, { id });
        if (res?.product) {
          setProduct(res.product);
        } else {
          notFound();
        }
      } catch (err) {
        console.log(err);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black/90 flex items-center justify-center">
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

  if (!product) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-black/90 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">
            Product not found
          </h2>
          <p className="text-gray-400">
            The product you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const chartData =
    product?.sales.map((sale) => {
      const date = new Date(Number(sale.createdAt));
      const format = `${date.getDate()}-${
        date.getMonth() + 1
      }-${date.getFullYear()}`;
      return {
        date: format,
        quantity: sale.quantity,
      };
    }) || [];

  const getStockStatus = () => {
    if (product.stock === 0)
      return {
        icon: AlertCircle,
        text: "Out of Stock",
        color: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-500/30",
      };
    if (product.stock <= 5)
      return {
        icon: Clock,
        text: "Low Stock",
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-500/30",
      };
    return {
      icon: CheckCircle,
      text: "In Stock",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
    };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  return (
    <div className="min-h-screen dark:bg-black/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="group inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black   dark:text-gray-300 dark:bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-700/50 hover:border-gray-600 hover:text-white transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Back to Products
          </button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-8 h-8 text-black dark:text-purple-400" />
            <h1 className="text-2xl sm:text-4xl font-bold text-black dark:text-white">
              Product Details
            </h1>
          </div>
          <p className="text-gray-400">
            Comprehensive product information and sales analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
              <div className="aspect-video relative bg-gray-800">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-700 border-t-purple-500 rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  fill
                  src={product.imageUrl}
                  alt={product.title}
                  className={`object-contain transition-opacity duration-300 ${
                    imageLoading ? "opacity-0" : "opacity-100"
                  }`}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  onLoad={() => setImageLoading(false)}
                  priority
                />
              </div>
            </div>
          </div>

          <div className="space-y-5.5">
            <div className="dark:bg-gray-900/50 bg-gray-50 border border-gray-800 rounded-lg p-6">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-black dark:text-white mb-2">
                  {product.title}
                </h2>
                <span className="inline-block px-3 py-1 text-sm font-medium dark:bg-purple-500/20 text-purple-300 border border-purple-300 dark:border-purple-500/30  rounded-full">
                  {product.category}
                </span>
              </div>
              <div className="text-3xl font-bold text-black dark:text-white mb-4">
                ${product.price}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-gray-400">Stock:</span>
                <span className="text-xl font-semibold text-black dark:text-white">
                  {product.stock}
                </span>
                <div
                  className={`inline-flex items-center gap-2 px-2 py-1 rounded-md border text-xs ${stockStatus.bg} ${stockStatus.border}`}
                >
                  <StockIcon className={`w-3 h-3 ${stockStatus.color}`} />
                  <span className={stockStatus.color}>{stockStatus.text}</span>
                </div>
              </div>
            </div>

            <div className="dark:bg-gray-900/50 bg-gray-50 border border-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-black dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-black dark:text-white">
                  Sales Overview
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Sales:</span>
                  <span className="font-semibold text-black dark:text-white">
                    {product.sales?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Revenue:</span>
                  <span className="font-semibold text-green-600">
                    $
                    {(product.sales || [])
                      .reduce(
                        (sum, sale) => sum + sale.quantity * product.price,
                        0
                      )
                      .toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              {user?.role && <SaleProductBtn product={product} />}
              {user?.role !== "staff" && user?.role && (
                <div className="flex gap-3 items-center">
                  <EditProductBtn product={product} setProduct={setProduct} />
                  <DeleteProdBtn id={product.id} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="dark:bg-gray-900/50 bg-gray-50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-black dark:bg-purple-500 rounded-full"></div>
              Description
            </h3>
            <p className="dark:text-gray-300 text-black leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="dark:bg-gray-900/50 bg-gray-50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-black dark:text-purple-400" />
              <h3 className="text-lg font-semibold text-black dark:text-white">Sales Stats</h3>
            </div>

            <div className="h-64 dark:bg-gray-800/50 rounded-lg border border-gray-700 p-4">
              <ProductSaleChart chartData={chartData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
