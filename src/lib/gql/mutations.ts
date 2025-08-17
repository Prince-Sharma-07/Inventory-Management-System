import { gql } from "graphql-request";

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $username: String!
    $password: String!
    $role: String!
  ) {
    createdUser: createUser(
      name: $name
      email: $email
      username: $username
      password: $password
      role: $role
    ) {
      id
      name
      username
      email
      role
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String!
    $category: String!
    $price: Float!
    $stock: Int!
    $imageUrl: String!
  ) {
    createdProduct: addProduct(
      title: $title
      description: $description
      category: $category
      price: $price
      stock: $stock
      imageUrl: $imageUrl
    ) {
      title
    }
  }
`;

export const CREATE_SALE = gql`
  mutation CreateSale($id: String!, $quantity: Int!) {
    createSale(id: $id, quantity: $quantity)
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateUserRole($userId: String!, $role: String!) {
    updateUserRole(userId: $userId, role: $role)
  }
`;

export const DELETE_USER = gql`
  mutation UpdateUserRole($id: String!) {
    deleted: deleteUser(id: $id)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUserRole(
    $userId: String!
    $name: String!
    $email: String!
    $username: String!
    $avatar: String
  ) {
    updated: updateUserProfile(
      userId: $userId
      name: $name
      email: $email
      username: $username
      avatar: $avatar
    )
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProductDetails(
    $id: String!
    $title: String!
    $description: String!
    $imageUrl: String!
    $category: String!
    $price: Float!
    $stock: Int!
  ) {
    updated: updateProduct(
      id: $id
      title: $title
      description: $description
      imageUrl: $imageUrl
      category: $category
      price: $price
      stock: $stock
    )
  }
`;

export const DELETE_PRODUCT = gql`
  mutation UpdateUserRole($id: String!) {
    deleted: deleteProduct(id: $id)
  }
`;

export const UPDATE_AVATAR = gql`
  mutation UpdateAvatar($id: String!, $avatar: String!) {
    updated:updateAvatar(id: $id, avatar: $avatar)
  }
`;
