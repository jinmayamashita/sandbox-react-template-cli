import { useQuery } from "@tanstack/react-query";

function User() {
  const { data } = useQuery(["user"], () =>
    fetch("/user")
      .then((res) => res.json())
      .then((data) => data)
  );
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
export default User;
