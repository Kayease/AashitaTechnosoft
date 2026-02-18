"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft01Icon,
  UserIcon,
  Mail01Icon,
  AccessIcon,
} from "@hugeicons/react";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    console.log("Registering with:", { name, email, password });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-v2">
      <div className="flex flex-col items-center mb-6 w-full">
        <Link href="/" className="back-link-v2 mb-3">
          <ArrowLeft01Icon size={18} />
          <span>Return Home</span>
        </Link>
        <h1 className="title-v2">Join Aashita</h1>
        <p className="subtitle-v2">Create your professional account</p>
      </div>

      <div className="fields-stack-v2">
        <div
          className={`input-group-v2 ${focusedField === "name" ? "focused" : ""} ${errors.name ? "error" : ""}`}
        >
          <UserIcon className="input-icon-v2" size={20} />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            placeholder="Full Name"
            className="input-v2"
          />
          {errors.name && <span className="error-msg-v2">{errors.name}</span>}
        </div>

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
            placeholder="Work Email"
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

        <div
          className={`input-group-v2 ${focusedField === "confirmPassword" ? "focused" : ""} ${errors.confirmPassword ? "error" : ""}`}
        >
          <AccessIcon className="input-icon-v2" size={20} />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onFocus={() => setFocusedField("confirmPassword")}
            onBlur={() => setFocusedField(null)}
            placeholder="Confirm Password"
            className="input-v2"
          />
          {errors.confirmPassword && (
            <span className="error-msg-v2">{errors.confirmPassword}</span>
          )}
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="primary-btn-v2"
      >
        {isLoading ? <div className="loading-spinner-v2" /> : "Register"}
      </motion.button>

      {/* Mobile Switch */}
      <button
        type="button"
        onClick={onSwitchToLogin}
        className="mobile-toggle-v2"
      >
        Already a member? <span>Login</span>
      </button>
    </form>
  );
}
