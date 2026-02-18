"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Nunito } from "next/font/google";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import FloatingTechIcons from "@/components/auth/FloatingTechIcons";
import "./auth.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

function AuthContent() {
  const searchParams = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(false);
  const [animPhase, setAnimPhase] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const urlMode = searchParams.get("mode");
    if (urlMode === "register") {
      setIsSignUp(true);
    }
  }, [searchParams]);

  // Animation sequence for overlay text fade-in
  useEffect(() => {
    if (!mounted) return;
    setAnimPhase(0);
    const t1 = setTimeout(() => setAnimPhase(1), 400);
    const t2 = setTimeout(() => setAnimPhase(2), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isSignUp, mounted]);

  // Prevent hydration flash/unstyled content
  if (!mounted) {
    return (
      <main className={`book-auth-page ${nunito.className}`}>
        <div className="loading-spinner-v2" />
      </main>
    );
  }

  return (
    <main className={`book-auth-page ${nunito.className}`}>
      {/* Background Blobs */}
      <div className="bg-decor bg-blob-1" />
      <div className="bg-decor bg-blob-2" />

      {/* Main Book Container */}
      <div
        className={`book-container ${isSignUp ? "flipped" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Static Left Panel (Registration Content) */}
        <div className="book-panel left-panel">
          <div className="tech-pattern-bg" />
          {isHovered && <FloatingTechIcons />}
          <div className="panel-content">
            <RegisterForm onSwitchToLogin={() => setIsSignUp(false)} />
          </div>
        </div>

        {/* Static Right Panel (Login Content) */}
        <div className="book-panel right-panel">
          <div className="tech-pattern-bg" />
          {isHovered && <FloatingTechIcons />}
          <div className="panel-content">
            <LoginForm onSwitchToRegister={() => setIsSignUp(true)} />
          </div>
        </div>

        {/* Flipping Page (Brand/Overlay) */}
        <div className="flipping-page">
          {/* Front Side (Login Overlay) */}
          <div className="page-side page-front">
            <div className="clay-visual-circle">
              <div className="clay-visual-circle-inner" />
            </div>
            <div className="overlay-content">
              <div className="clay-brand-header">
                <div className="clay-logo-ring">
                  <img
                    src="/rectanglelogo.png"
                    alt="Aashita AI"
                    className="clay-logo-img"
                  />
                </div>
              </div>
              <h1
                className="clay-overlay-title"
                style={{
                  opacity: !isSignUp && animPhase >= 1 ? 1 : 0,
                  transform:
                    !isSignUp && animPhase >= 1
                      ? "translateY(0)"
                      : "translateY(15px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                Hello, Friend!
              </h1>
              <p
                className="clay-overlay-text"
                style={{
                  opacity: !isSignUp && animPhase >= 2 ? 1 : 0,
                  transform:
                    !isSignUp && animPhase >= 2
                      ? "translateY(0)"
                      : "translateY(10px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                Join our elite community of tech innovators and shape the
                future.
              </p>
            </div>
          </div>

          {/* Back Side (Register Overlay) */}
          <div className="page-side page-back">
            <div className="clay-visual-circle">
              <div className="clay-visual-circle-inner" />
            </div>
            <div className="overlay-content">
              <div className="clay-brand-header">
                <div className="clay-logo-ring">
                  <img
                    src="/rectanglelogo.png"
                    alt="Aashita AI"
                    className="clay-logo-img"
                  />
                </div>
              </div>
              <h1
                className="clay-overlay-title"
                style={{
                  opacity: isSignUp && animPhase >= 1 ? 1 : 0,
                  transform:
                    isSignUp && animPhase >= 1
                      ? "translateY(0)"
                      : "translateY(15px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                Welcome Home!
              </h1>
              <p
                className="clay-overlay-text"
                style={{
                  opacity: isSignUp && animPhase >= 2 ? 1 : 0,
                  transform:
                    isSignUp && animPhase >= 2
                      ? "translateY(0)"
                      : "translateY(10px)",
                  transition: "all 0.6s ease-out",
                }}
              >
                Authorization required to access the secure technology portal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={null}>
      <AuthContent />
    </Suspense>
  );
}
