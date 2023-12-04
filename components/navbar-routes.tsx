"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function NavbarRoutes() {
  const pathName = usePathname();

  const isTeacherRoute = pathName?.startsWith("teacher");
  const isPlayerRoute = pathName?.includes("teacher");

  return (
    <div className="ml-auto flex gap-x-2 items-center">
      {isTeacherRoute || isPlayerRoute ? (
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Teacher Mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
