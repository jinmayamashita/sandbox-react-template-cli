import { useQuery } from "@tanstack/react-query";

const User = () => {
  const { data } = useQuery(["user"], () =>
    fetch("/get_user")
      .then((res) => res.json())
      .then((data) => data)
  );
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default User;
