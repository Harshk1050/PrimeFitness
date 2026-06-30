"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Menu } from "./menu";
import { PanelLeft } from "lucide-react";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  session: Session;
}

export function Sidebar({ isOpen, setIsOpen, session }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed custom-scrollbar  top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        isOpen ? "w-72" : "w-[90px]",
      )}
    >
      <Button
        variant="outline"
        size="icon"
        className="absolute -right-3 top-4 z-30 h-6 w-6 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PanelLeft size={14} />
      </Button>

      <div className="relative h-full custom-scrollbar flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <div
          className={cn("mb-4 flex items-center ", !isOpen && "justify-center")}
        >
          <Image
            src="/FullLogo-Photoroom.svg"
            alt="Prime Fitness"
            width={66}
            height={52}
            className="object-contain "
          />
        </div>
        <Menu isOpen={isOpen} session={session} />
      </div>
    </aside>
  );
}
