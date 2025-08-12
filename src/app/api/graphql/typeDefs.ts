import { gql } from "graphql-request";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getAllUsers: [User]
    getAllProducts: [Product]
    getProductById(id : String!): Product
  }

  type Mutation {
    createSale(id : String! , quantity : Int!) : Boolean
    createUser(
      name: String!
      email: String!
      username: String!
      password: String!
      role: String!
    ): User
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(
      userId: String!
      name: String!
      email: String!
      username: String!
      avatar: String
    ): Boolean
    addProduct(
      title: String!
      description: String!
      category: String!
      price: Float!
      stock: Int!
      imageUrl: String!
    ): Product
  }

  type Product {
    title: String
    id: String
    description: String
    category: String
    price: Float
    stock: Int
    imageUrl: String
    sales: [Sale]
  }

  type User {
    id: String
    name: String
    username: String
    email: String
    avatar: String
    role: String
  }
  
  type Sale {
    id : String
   productId: String
   quantity: Int
    createdAt: String
  }
`;

export default typeDefs;
