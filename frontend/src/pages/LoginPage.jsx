import { LoginForm } from "../components/auth/LoginForm";
import { login } from "../store/actions/auth-actions";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  function normalizeEmail(value) {
    return typeof value === "string" ? value.trim().toLowerCase() : value;
  }

  async function handleLogin(credentials) {
    try {
      await login({ ...credentials, email: normalizeEmail(credentials.email) });
      navigate("/board");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  return <LoginForm onSubmit={handleLogin} />;
}
