"use client";

import { BarChart, Compass, Layout, List, LucideIcon } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

type Routes = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export default function SidebarRoutes() {
  const guestRoutes: Routes[] = [
    {
      icon: Layout,
      label: "Dashboard",
      href: "/",
    },
    {
      icon: Compass,
      label: "Browse",
      href: "/search",
    },
  ];

  const teacherRoutes: Routes[] = [
    {
      icon: List,
      label: "Courses",
      href: "/teacher/courses",
    },
    {
      icon: BarChart,
      label: "Analytics",
      href: "/teacher/analytics",
    },
  ];
  const pathName = usePathname();
  const isTeacherPage = pathName?.includes("teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          href={route.href}
          label={route.label}
        />
      ))}
    </div>
  );
}
