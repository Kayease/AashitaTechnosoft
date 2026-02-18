"use client";

import { ReactNode, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormFieldProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
  icon?: ReactNode;
}

/**
 * Premium form field with glassmorphism, animated gradients, and floating labels
 */
export function FormField({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  required = false,
  multiline = false,
  rows = 4,
  placeholder = "",
  icon,
}: FormFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const isFloating = isFocused || hasValue;

  const InputComponent = multiline ? "textarea" : "input";

  return (
    <div className="relative group" onClick={() => inputRef.current?.focus()}>
      {/* Animated gradient border wrapper */}
      <motion.div
        className="relative rounded-2xl p-[1.5px] overflow-hidden"
        animate={{
          background: error
            ? "linear-gradient(135deg, #ef4444, #f87171, #ef4444)"
            : isFocused
              ? "linear-gradient(135deg, #2563EB, #2FB7C4, #2563EB, #2FB7C4)"
              : "linear-gradient(135deg, rgba(11,45,92,0.1), rgba(37,99,235,0.1))",
        }}
        transition={{ duration: 0.4 }}
        style={{
          backgroundSize: isFocused ? "300% 300%" : "100% 100%",
          animation: isFocused
            ? "borderGradientSpin 3s linear infinite"
            : "none",
        }}
      >
        <div
          className={`relative rounded-[14px] transition-all duration-300 ${
            isFocused
              ? "bg-white shadow-lg shadow-brand-blue/10"
              : "bg-white/80 backdrop-blur-sm"
          }`}
        >
          {/* Icon */}
          {icon && (
            <motion.div
              className="absolute left-4 z-10 pointer-events-none"
              style={{
                top: multiline ? "18px" : "50%",
                y: multiline ? 0 : "-50%",
              }}
              animate={{
                color: error
                  ? "#ef4444"
                  : isFocused
                    ? "#2563EB"
                    : "rgba(11,45,92,0.3)",
                scale: isFocused ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          )}

          {/* Floating label */}
          <motion.label
            className={`absolute pointer-events-none z-10 origin-left ${
              error
                ? "text-red-400"
                : isFocused
                  ? "text-brand-blue"
                  : "text-brand-navy/40"
            }`}
            animate={{
              top: isFloating ? "8px" : multiline ? "18px" : "50%",
              y: isFloating ? 0 : multiline ? 0 : "-50%",
              left: icon ? "44px" : "18px",
              fontSize: isFloating ? "11px" : "15px",
              fontWeight: isFloating ? 600 : 400,
              letterSpacing: isFloating ? "0.05em" : "0em",
            }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {label}
            {required && (
              <motion.span
                className="text-brand-cyan ml-0.5"
                animate={{ opacity: isFloating ? 1 : 0.5 }}
              >
                •
              </motion.span>
            )}
          </motion.label>

          {/* Input */}
          <InputComponent
            ref={inputRef as any}
            type={multiline ? undefined : type}
            name={name}
            value={value}
            onChange={(e: any) => onChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isFocused ? placeholder : ""}
            rows={multiline ? rows : undefined}
            className={`w-full bg-transparent text-brand-navy font-medium focus:outline-none resize-none transition-all duration-300 placeholder:text-brand-navy/20 ${
              icon ? "pl-12" : "pl-[18px]"
            } pr-5 ${
              isFloating ? "pt-7 pb-3" : multiline ? "pt-5 pb-3" : "pt-5 pb-3"
            } ${multiline ? "min-h-[120px]" : ""}`}
            style={{ fontSize: "15px" }}
          />

          {/* Focus glow bar */}
          <motion.div
            className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
            style={{
              background: error
                ? "linear-gradient(90deg, #ef4444, #f87171)"
                : "linear-gradient(90deg, #2563EB, #2FB7C4)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: isFocused ? 1 : 0,
              opacity: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </motion.div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="mt-2 ml-1 text-xs font-semibold text-red-500 flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inject keyframes for gradient animation */}
      <style jsx>{`
        @keyframes borderGradientSpin {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
