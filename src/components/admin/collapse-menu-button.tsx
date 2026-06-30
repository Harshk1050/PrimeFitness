"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  icon: any;
  label: string;
  href: string;
  submenus: { label: string; href: string }[];
  pathname: string;
  isOpen?: boolean;
}

export function CollapseMenuButton({ icon: Icon, label, href, submenus, pathname, isOpen }: Props) {
  const [open, setOpen] = useState(pathname.startsWith(href));
  const isActive = pathname.startsWith(href) || submenus.some((s) => pathname.startsWith(s.href));

  return (
    <div className="w-full">
      <Button
        type="button"
        onClick={() => setOpen(!open)}
        variant={isActive ? "skyblue" : "ghost"}
        className="w-full h-10 justify-start"
      >
        <span className="flex w-6 items-center justify-center">
          <Icon size={18} />
        </span>
        <span className={cn("ml-3 flex-1 text-left", isOpen ? "block" : "hidden")}>
          {label}
        </span>
        {isOpen && (
          <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
        )}
      </Button>

      {open && isOpen && (
        <ul className="ml-1 mt-1 space-y-1">
          {submenus.map((submenu) => (
            <li key={submenu.href}>
              <Button
                asChild
                variant={pathname === submenu.href ? "lightSkyblue" : "ghost"}
                className="h-9 w-full justify-start text-sm"
              >
                <Link href={submenu.href}>{submenu.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
