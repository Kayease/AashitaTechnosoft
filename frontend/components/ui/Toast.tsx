"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import {
  CheckmarkCircle01Icon,
  CancelCircleIcon,
  HelpCircleIcon,
  Cancel01Icon,
} from "@hugeicons/react";
import { motion, AnimatePresence } from "framer-motion";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const contextValue = useMemo(() => ({ showToast }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto min-w-[300px] max-w-sm bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-100 p-4 flex items-start gap-4"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  toast.type === "success"
                    ? "bg-[#E6F9F0] text-[#00C07D]"
                    : toast.type === "error"
                      ? "bg-[#FFF0F0] text-[#FF5A5A]"
                      : "bg-[#EEF2FF] text-[#6366F1]"
                }`}
              >
                {toast.type === "success" && (
                  <CheckmarkCircle01Icon size={18} variant="bulk" />
                )}
                {toast.type === "error" && (
                  <CancelCircleIcon size={18} variant="bulk" />
                )}
                {toast.type === "info" && (
                  <HelpCircleIcon size={18} variant="bulk" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p
                  className={`text-xs font-bold uppercase tracking-wide mb-0.5 ${
                    toast.type === "success"
                      ? "text-[#00C07D]"
                      : toast.type === "error"
                        ? "text-[#FF5A5A]"
                        : "text-[#6366F1]"
                  }`}
                >
                  {toast.type === "success"
                    ? "Success"
                    : toast.type === "error"
                      ? "Error"
                      : "Update"}
                </p>
                <p className="text-sm font-medium text-[#1E2A3A] leading-snug">
                  {toast.message}
                </p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <Cancel01Icon size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
