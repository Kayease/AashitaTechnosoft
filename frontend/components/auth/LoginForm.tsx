"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft01Icon, Mail01Icon, AccessIcon } from "@hugeicons/react";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    console.log("Logging in with:", { email, password });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-v2">
      <div className="flex flex-col items-center mb-6 w-full">
        <Link href="/" className="back-link-v2 mb-4">
          <ArrowLeft01Icon size={18} />
          <span>Return Home</span>
        </Link>
        <h1 className="title-v2">Welcome Back</h1>
        <p className="subtitle-v2">Please enter your credentials</p>
      </div>

      <div className="fields-stack-v2">
        <div
          className={`input-group-v2 ${focusedField === "email" ? "focused" : ""} ${errors.email ? "error" : ""}`}
        >
          <Mail01Icon className="input-icon-v2" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            placeholder="Email Address"
            className="input-v2"
          />
          {errors.email && <span className="error-msg-v2">{errors.email}</span>}
        </div>

        <div
          className={`input-group-v2 ${focusedField === "password" ? "focused" : ""} ${errors.password ? "error" : ""}`}
        >
          <AccessIcon className="input-icon-v2" size={20} />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
            placeholder="Password"
            className="input-v2"
          />
          {errors.password && (
            <span className="error-msg-v2">{errors.password}</span>
          )}
        </div>
      </div>

      <div className="flex justify-start w-full mt-2">
        <button type="button" className="text-btn-v2">
          Forgot password?
        </button>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="primary-btn-v2"
      >
        {isLoading ? <div className="loading-spinner-v2" /> : "Login"}
      </motion.button>

      {/* Mobile Switch */}
      <button
        type="button"
        onClick={onSwitchToRegister}
        className="mobile-toggle-v2"
      >
        New here? <span>Create account</span>
      </button>
    </form>
  );
}
