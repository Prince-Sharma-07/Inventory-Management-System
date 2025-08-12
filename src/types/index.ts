import { Product, RoleType, Sale } from "../../generated/prisma";

export type UserWithoutPassword = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string | null;
  role: RoleType;
};

export type ProductWithSales = Product & { sales: Sale[] };
