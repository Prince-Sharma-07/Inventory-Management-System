import { GraphQLClient } from "graphql-request";

const gqlClient = new GraphQLClient(`${process.env.NEXT_PUBLIC_HOST_NAME as string}/api/graphql`);
 
export default gqlClient;
