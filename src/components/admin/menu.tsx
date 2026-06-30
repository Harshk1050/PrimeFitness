"use client";

import { Ellipsis, LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CollapseMenuButton } from "./collapse-menu-button";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Session } from "next-auth";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";

interface MenuProps {
  isOpen: boolean;
  session: Session;
}

export function Menu({ isOpen, session }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);

  return (
    <ScrollArea className="flex-1">
      <nav className="mt-4 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-120px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li
              key={index}
              className={cn(
                "w-full border-t border-gray-200 pb-3",
                groupLabel && "pt-3",
              )}
            >
              {groupLabel &&
                (isOpen ? (
                  <p className="px-4 pb-1 text-sm font-medium text-muted-foreground">
                    {groupLabel}
                  </p>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-full flex justify-center">
                        <Ellipsis className="h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent side="right">{groupLabel}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}

              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, idx) =>
                  !submenus || submenus.length === 0 ? (
                    <div key={idx} className="w-full">
                      <TooltipProvider disableHoverableContent>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              variant={
                                (active === undefined &&
                                  pathname.startsWith(href)) ||
                                active
                                  ? "green"
                                  : "ghost"
                              }
                              className="w-full h-10 justify-start"
                            >
                              <Link href={href}>
                                <span className="flex w-6 items-center justify-center">
                                  <Icon size={18} />
                                </span>
                                <span
                                  className={cn(
                                    "ml-3 truncate",
                                    isOpen ? "block" : "hidden",
                                  )}
                                >
                                  {label}
                                </span>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {!isOpen && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <CollapseMenuButton
                      key={idx}
                      icon={Icon}
                      label={label}
                      href={href}
                      submenus={submenus}
                      pathname={pathname}
                      isOpen={isOpen}
                    />
                  ),
              )}
            </li>
          ))}

          <li className="w-full mt-auto pb-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() =>
                      fetch("/api/auth/signout", { method: "POST" }).then(
                        () => {
                          window.location.href = "/admin/login";
                        },
                      )
                    }
                    variant="outline"
                    className="w-full h-10 justify-start text-white bg-red-500 border-red-500 hover:bg-white hover:text-red-500"
                  >
                    <span className="flex w-6 items-center justify-center">
                      <LogOut size={18} />
                    </span>
                    <span className={cn("ml-3", isOpen ? "block" : "hidden")}>
                      Sign out
                    </span>
                  </Button>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">Sign out</TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </nav>
    </ScrollArea>
  );
}
