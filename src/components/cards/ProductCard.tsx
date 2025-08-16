// import React from "react";
// import { Product } from "../../../generated/prisma";

// export default function ProductCard({ product }: { product: Product }) {
//   return (
//     <div className="card shadow-card dark:bg-base-100 h-130">
//       <figure>
//         <img
//           src={product.imageUrl}
//           alt="product_image"
//         />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">
//           {product.title}
//           <div className="badge badge-secondary px-2">NEW</div>
//         </h2>
//         <p className="line-clamp-3">
//           {product.description}
//         </p>
//         <span>Price: ${product.price}</span>
//         <div className="card-actions justify-end">
//           <div className="badge border-white border px-2 min-w-10 rounded-2xl">{product.category}</div>
//           <div className="badge border-white border px-2 min-w-10 rounded-2xl">{product.stock} stocks</div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import Image from "next/image";
import { Product } from "../../../generated/prisma";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    
    <div className="flex h-16 sm:h-17 md:h-18 lg:h-19 xl:h-20 shadow-card dark:bg-gray-950 w-full rounded-md">
      <div className="flex h-full justify-between items-center w-full">
        <Image 
          src={product.imageUrl}
          alt={product.title}
          width={106}
          height={100}
          className="object-contain h-full rounded-l-md"
        />   
      <div className="flex gap-3 p-4 justify-between items-center w-full">
        
        <div className="flex flex-col gap-2 justify-between">
          <span className="text-sm lg:text-lg xl:text-xl">{product.title}</span>
          <span className="font-medium">{formatPrice(product.price)}</span>
        </div>
        <Link href={"/product/" + product.id} className="hover:text-blue-600 text-nowrap text-sm lg:text-lg xl:text-xl">View Detail</Link>
      </div>
      
      </div>
    </div>
  );
}
