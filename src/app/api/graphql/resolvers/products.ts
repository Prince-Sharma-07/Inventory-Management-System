import prismaClient from "@/lib/services/prisma";
import { ProductCategory } from "../../../../../generated/prisma";

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

export async function deleteProduct(
  _: any,
  args: {
    id: string;
  }
) {
  try {
    const res = await prismaClient.product.delete({
      where: {
        id: args.id,
      },
    });
    if (res.id) return true;
    return false;
  } catch (err: any) {
    console.log(err.message);
    return false;
  }
}

export async function updateProduct(
  _: any,
  args: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    stock: number;
    category: ProductCategory;
  }
) {
  const dataToUpdate = {
    title: args.title,
    description: args.description,
    imageUrl: args.imageUrl,
    price: args.price,
    stock: args.stock,
    category: args.category,
  };
  try {
    const res = await prismaClient.product.update({
      where: {
        id: args.id,
      },
      data: dataToUpdate,
    });
    if (res?.id) return true;
    else return false;
  } catch (err: any) {
    console.log("error on server while updating product", err.message);
    return false;
  }
}

export async function getSales() {
  try {
    const sales = await prismaClient.sale.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return sales;
  } catch (err: any) {
    console.log("err on server while fetching sales data, ", err.message);
    return [];
  }
}
