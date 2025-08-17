import { getUserFromCookies } from "@/lib/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import {
  addProduct,
  createSale,
  deleteProduct,
  getAllProducts,
  getProductById,
  getSales,
  updateProduct,
} from "./resolvers/products";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  updateAvatar,
  updateUserProfile,
  updateUserRole
} from "./resolvers/user";
import typeDefs from "./typeDefs";

const resolvers = {
  Query: {
    loginUser,
    logoutUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProductById,
    getSales,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
    deleteUser,
    deleteProduct,
    updateProduct,
    updateAvatar
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler(server);

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
