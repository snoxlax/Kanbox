import { useNavigate } from "react-router";

import { SignupForm } from "../components/auth/SignupForm";
import { signup } from "../store/actions/auth-actions";

export function SignupPage() {
  const navigate = useNavigate();

  function normalizeEmail(value) {
    return typeof value === "string" ? value.trim().toLowerCase() : value;
  }

  function normalizeUsername(value) {
    return typeof value === "string"
      ? value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9._-]/g, "")
          .replace(/^[._-]+|[._-]+$/g, "")
      : value;
  }

  function generateUsername(seed) {
    const safeSeed = normalizeUsername(seed) || "user";
    const suffix = Math.random().toString(36).slice(2, 6);
    return `${safeSeed}-${suffix}`;
  }

  function normalizeNamePart(value) {
    if (typeof value !== "string") return value;
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  }

  async function handleSignup(userData) {
    try {
      const firstName = normalizeNamePart(userData.firstName);
      const lastName = normalizeNamePart(userData.lastName);
      const fullname = [firstName, lastName].filter(Boolean).join(" ").trim();
      const email = normalizeEmail(userData.email);
      const usernameSeed =
        userData.username || email?.split("@")[0] || fullname;
      const normalizedData = {
        email,
        fullname,
        password: userData.password,
        confirmPassword: userData.confirmPassword,
        username:
          normalizeUsername(usernameSeed) || generateUsername(usernameSeed),
      };

      await signup(normalizedData);
      navigate("/board");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  }

  return <SignupForm onSubmit={handleSignup} />;
}
