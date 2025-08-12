import ProductSaleChart from "@/components/myUI/ProductSaleChart";
import { SaleProductBtn } from "@/components/myUI/SaleProductBtn";
import { GET_PRODUCT } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/graphQL";
import { ProductWithSales } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type Param = Promise<{
  id: string;
}>;

export default async function page({ params }: { params: Param }) {
  const { id } = await params;
  let product;
  try {
    const res: {
      product: ProductWithSales;
    } = await gqlClient.request(GET_PRODUCT, { id });
    if (res?.product) {
      product = res.product;
    } else {
      notFound();
    }
  } catch (err) {
    console.log(err);
    notFound();
  }

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
    <div className="w-full h-[85vh] min-h-[85vh] p-6">
      <div className="flex justify-between h-[80%] w-full">
        <div className="w-[35%] h-full p-4">
          <div className="relative h-full w-full">
            <Image fill src={product.imageUrl} alt={"product_image"} />
          </div>
        </div>
        <div className="w-[25%] p-4 flex flex-col gap-4 items-center justify-center">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-lg">Description: {product.description}</p>
          <span>Price: ${product.price}</span>
          <span>Stocks: {product.stock}</span>
          <span className="border border-white rounded-2xl w-fit min-w-10 py-0.5 px-3">
            {product.category}
          </span>
        </div>
        <div className="flex flex-col gap-4 w-[40%] items-center">
          <SaleProductBtn product={product} />
          <ProductSaleChart chartData={chartData} />
        </div>
      </div>
    </div>
  );
}
