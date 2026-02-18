"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AlertCircleIcon } from "@hugeicons/react";

interface AdminInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onValidationError?: (error: string) => void;
  onlyLetters?: boolean;
}

export default function AdminInput({
  label,
  error: externalError,
  onValidationError,
  onlyLetters,
  className = "",
  type = "text",
  required,
  value,
  onChange,
  onBlur,
  ...props
}: AdminInputProps) {
  const [internalError, setInternalError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const emailValidationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const error = externalError || internalError;

  // Auto-hide error after 4 seconds
  useEffect(() => {
    if (internalError) {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setInternalError("");
      }, 4000);
    }
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [internalError]);

  const validate = useCallback(
    (val: string, isImmediate = true) => {
      let newError = "";

      if (required && !val.trim()) {
        newError = "This field is required";
      } else if (type === "email" && val && !val.includes("@")) {
        newError = `Please include an '@' in the email address. '${val}' is missing an '@'.`;
      }

      if (isImmediate || !newError) {
        setInternalError(newError);
        if (onValidationError) onValidationError(newError);
      } else {
        // For debounced email validation
        if (emailValidationTimeoutRef.current)
          clearTimeout(emailValidationTimeoutRef.current);
        emailValidationTimeoutRef.current = setTimeout(() => {
          setInternalError(newError);
          if (onValidationError) onValidationError(newError);
        }, 2000); // 2 seconds delay
      }
    },
    [required, type, onValidationError],
  );

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    validate(e.target.value, true);
    if (onBlur) onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Filter letters only if prop is set
    if (onlyLetters) {
      val = val.replace(/[^a-zA-Z\s]/g, "");
      e.target.value = val;
    }

    if (onChange) onChange(e);

    // If there's an existing error, update it immediately
    // For email, use debounce if it's currently invalid
    if (internalError) {
      validate(val, true);
    } else if (type === "email") {
      validate(val, false);
    }
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    validate((e.target as HTMLInputElement).value, true);
  };

  return (
    <div className="relative w-full space-y-2">
      {label && (
        <label className="text-xs font-bold text-[#6B7A90] uppercase tracking-wider block">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type={type === "email" ? "text" : type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setIsFocused(true)}
          onInvalid={handleInvalid}
          className={`w-full px-4 py-3 rounded-xl border transition-all outline-none text-sm
          ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-[#4DA3FF]/10 focus:border-[#4DA3FF]"
          }
          bg-[#F6FAFF] ${className}`}
          {...props}
        />

        {error && (
          <div
            className="absolute left-0 right-0 mt-2 bg-white border border-red-200 
          rounded-xl shadow-[0_10px_30px_rgba(255,0,0,0.08)] p-3 flex items-start gap-2 
          animate-in fade-in slide-in-from-top-1 duration-200 z-[100]"
          >
            <AlertCircleIcon
              size={18}
              className="text-red-500 mt-[2px] shrink-0"
            />
            <p className="text-sm text-red-600 font-medium leading-relaxed">
              {error}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
