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
import ProductSaleChart from "@/components/myUI/ProductSaleChart";
import { SaleProductBtn } from "@/components/myUI/SaleProductBtn";
import { GET_PRODUCT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import { ProductWithSales } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

type Param = Promise<{
  id: string;
}>;

export default function Page({ params }: { params: Param }) {
  const router = useRouter();
  const [product, setProduct] = useState<ProductWithSales | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-500' };
    if (stock <= 5) return { text: 'Low Stock', color: 'text-amber-500' };
    return { text: 'In Stock', color: 'text-emerald-500' };
  };

  const stockStatus = getStockStatus(product.stock);

  const chartData =
    product?.sales.map((sale) => {
      const date = new Date(Number(sale.createdAt));
      const format =
        date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
      const quantity = sale.quantity;
      const obj = {
        date: format,
        quantity,
      };
      return obj;
    }) || [];

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 lg:p-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6 sm:mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 md:px-3 py-2 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors duration-200"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium max-md:hidden">Back</span>
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-light">Product Details</h1>
          <div className="w-16 h-px bg-black dark:bg-white mt-2"></div>
        </div>
      </div>

      {/* Top Section - Product Info */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
        {/* Product Image */}
        <div className="order-2 xl:order-1">
          <div className="relative aspect-square w-[70%] max-w-lg mx-auto xl:max-w-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
            <Image 
              fill 
              src={product.imageUrl} 
              alt={product.title}
              className="object-cover"
              sizes="(max-width: 768px) 90vw, (max-width: 1280px) 45vw, 40vw"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="order-1 xl:order-2 space-y-6 sm:space-y-8">
          {/* Title and Category */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 text-xs font-medium uppercase tracking-wider">
                {product.category}
              </span>
              <span className={`text-sm font-medium ${stockStatus.color}`}>
                {stockStatus.text}
              </span>
            </div>
            <h1 className="text-3xl font-light leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Price */}
          <div>
            <span className="text-4xl font-light">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium opacity-60 mb-3 uppercase tracking-wide">
              Description
            </h3>
            <p className="text-base sm:text-lg leading-relaxed opacity-80">
              {product.description}
            </p>
          </div>

          {/* Stock Information */}
          <div>
            <h3 className="text-sm font-medium opacity-60 mb-4 uppercase tracking-wide">
              Availability
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between max-w-xs">
                <span className="text-sm sm:text-base opacity-70">Units Available</span>
                <span className="text-lg sm:text-xl font-medium">{product.stock}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <SaleProductBtn product={product} />
          </div>
        </div>
      </div>

      {/* Bottom Section - Sales Chart */}
      <div className="w-full">
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
            <h2 className="text-xl sm:text-2xl font-light">Sales Analytics</h2>
            <span className="text-sm opacity-60">
              {product.sales?.length || 0} total sales
            </span>
          </div>
          
          {/* Chart Container - Full Width */}
          <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-3 sm:p-6">
            <ProductSaleChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}