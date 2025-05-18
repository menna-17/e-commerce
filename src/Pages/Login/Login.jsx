import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");
    setServerError("");

    let isValid = true;

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) return;

    // Check against localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      // Save to current session
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      navigate("/dashboard");
    } else {
      setServerError("Invalid email or password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-4 shadow"
        style={{ width: "100%", maxWidth: "400px" }}
      >
       <h3 className="text-center mb-4 custom-label">Login</h3>

        <form onSubmit={handleLogin}>
          <div className="form-group mb-2">
            <label className="custom-label">Email address</label>
            <input
              type="email"
              className={`form-control ${emailError ? "is-invalid" : ""}`}
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="text-danger mt-1">{emailError}</div>}
          </div>

          <div className="form-group mb-2">
            <label className="custom-label">Password</label>
            <input
              type="password"
              className={`form-control ${passwordError ? "is-invalid" : ""}`}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="text-danger mt-1">{passwordError}</div>
            )}
          </div>

          {serverError && (
            <div className="text-danger mt-2 text-center">{serverError}</div>
          )}
          <button type="submit" className="btn custom-login-btn w-100 mt-3">
            Login
          </button>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <a
              href="/signup"
              className="text-primary"
              style={{ textDecoration: "none" }}
            >
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
