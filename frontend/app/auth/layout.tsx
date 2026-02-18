import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Aashita.ai",
  description: "Login or create an account to access Aashita.ai services.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="auth-layout">{children}</div>;
}
