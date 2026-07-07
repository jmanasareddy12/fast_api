import { useState } from "react";
import { login } from "../Services/AuthService";
import axios from "axios";
import "./login.css"

type Props = {
  onLogin: (token: string) => void;
  onSwitchToRegister: () => void;
};

function Login({ onLogin, onSwitchToRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      // Save token in localStorage
      localStorage.setItem("token", response.access_token);

      console.log("Token Saved:", response.access_token);

      // Notify parent component
      onLogin(response.access_token);

      alert("Login Successful");
    } catch (error) {
      console.error("Login Error:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Backend Response:", error.response.data);
          alert(error.response.data.detail);
        } else if (error.request) {
          alert("Cannot connect to backend.");
        } else {
          alert(error.message);
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
  <div className="login-page">
    <div className="login-card">
      <h1 className="logo">TalentSpark</h1>
      

      <form onSubmit={handleSubmit}>
        <h2>Welcome Back </h2>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        <p className="switch-text">
          Don't have an account?
        </p>

        <button
          type="button"
          className="register-btn"
          onClick={onSwitchToRegister}
        >
          Create Account
        </button>
      </form>
    </div>
  </div>
);
}

export default Login;