import { useAuth } from "../modules/auth/hooks/useAuth";

function Login() {
  const { login } = useAuth();
  return <button onClick={login}>Please log in first</button>;
}
export default Login;
