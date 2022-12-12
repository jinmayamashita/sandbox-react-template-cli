import { login } from "../hooks/useAuth";

function Login() {
  return <button onClick={login}>Please log in first</button>;
}
export default Login;
