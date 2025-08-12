import prismaClient from "@/lib/services/prisma";
import { Product, ProductCategory } from "../../../../../generated/prisma";

export async function addProduct(
  _: any,
  args: {
    title: string;
    description: string;
    imageUrl: string;
    category: ProductCategory;
    price: number;
    stock: number;
  }
) {
  try {
    const createdProduct = await prismaClient.product.create({
      data: args,
    });
    return createdProduct;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export async function getAllProducts() {
  try {
    const products = await prismaClient.product.findMany();
    return products;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export async function getProductById(
  _: any,
  args: {
    id: string;
  }
) {
  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id: args.id,
      },
      include: {
        sales: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
    return product;
  } catch (err: any) {
    console.log(err.message);
  }
}

export async function createSale(
  _: any,
  args: {
    id: string;
    quantity: number;
  }
) {
  try {
    const sale = await prismaClient.sale.create({
      data: {
        productId: args.id,
        quantity: args.quantity,
      },
    });
    if (sale) {
      await prismaClient.product.update({
        where: {
          id: args.id,
        },
        data: {
          stock: {
            decrement: args.quantity,
          },
        },
      });
    }
    return true;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}
