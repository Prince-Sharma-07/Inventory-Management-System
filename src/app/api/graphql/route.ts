import { getUserFromCookies } from "@/lib/helper";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import {
  addProduct,
  createSale,
  getAllProducts,
  getProductById,
} from "./resolvers/products";
import {
  createUser,
  getAllUsers,
  loginUser,
  updateUserProfile,
  updateUserRole,
} from "./resolvers/user";
import typeDefs from "./typeDefs";

const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProductById,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
