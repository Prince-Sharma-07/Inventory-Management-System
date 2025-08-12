import { gql } from "graphql-request";

export const LOGIN = gql`
  query Query($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    AllUsers: getAllUsers {
      avatar
      email
      id
      role
      name
      username
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetAllProducts {
    AllProducts: getAllProducts {
      title
      stock
      price
      imageUrl
      id
      description
      category
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProductById($id: String!) {
    product: getProductById(id: $id) {
      title
      stock
      price
      imageUrl
      id
      description
      category
      sales {
        productId
        quantity
        id
        createdAt
      }
    }
  }
`;
