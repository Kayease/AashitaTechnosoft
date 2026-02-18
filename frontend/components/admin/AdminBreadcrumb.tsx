"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft01Icon } from "@hugeicons/react";

export default function AdminBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length < 2) return null; // Only show on sub-pages

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    const isActive = index === segments.length - 1;
    return {
      label:
        segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " "),
      href,
      isActive,
    };
  });

  return (
    <div className="flex items-center gap-2 mb-6 text-sm font-medium text-[#6B7A90]">
      <Link
        href="/admin/dashboard"
        className="hover:text-[#4DA3FF] transition-colors flex items-center gap-1"
      >
        <ArrowLeft01Icon size={14} /> Back
      </Link>
      <span className="text-[#4DA3FF]/20 mx-2">/</span>
      {breadcrumbs.map((crumb, index) => (
        <span key={crumb.href} className="flex items-center">
          {index > 0 && <span className="mx-2 text-[#4DA3FF]/20">/</span>}
          {crumb.isActive ? (
            <span className="text-[#4DA3FF] font-bold">{crumb.label}</span>
          ) : (
            <Link
              href={crumb.href}
              className="hover:text-[#4DA3FF] transition-colors text-[#6B7A90]"
            >
              {crumb.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
