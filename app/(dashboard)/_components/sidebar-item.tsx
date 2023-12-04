"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type SidebarItemProps = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export default function SidebarItem({
  icon: Icon,
  label,
  href,
}: SidebarItemProps) {
  const pathName = usePathname();
  const router = useRouter();

  const isActive =
    (pathName === "/" && href === "/") ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);

  return (
    <button
      onClick={() => router.push(href)}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
      )}
    >
      <div className="flex items-center py-4 gap-x-4">
        <Icon
          size={22}
          className={cn("text-slate-500", isActive && "text-sky-700")}
        />
        {label}
      </div>
      <div
        className={cn(
          "border-2 border-sky-700 h-full transition-all ml-auto opacity-0",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
}
