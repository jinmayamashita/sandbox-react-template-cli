import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

const GET_USER = gql`
  query GetUser {
    name
  }
`;

export default () => {
  const { data } = useQuery(["user"], () => request("*", GET_USER));
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};
