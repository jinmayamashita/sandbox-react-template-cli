import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";

function User() {
  const { data } = useQuery(["user"], () =>
    request(
      "*",
      gql`
        query GetUser {
          name
        }
      `
    )
  );
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
export default User;
