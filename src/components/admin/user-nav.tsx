"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import type { Session } from "next-auth";

export function UserNav({ session }: { session: Session }) {
  const user = session.user;
  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : "AD";

  function handleSignOut() {
    fetch("/api/auth/signout", { method: "POST" }).then(() => {
      window.location.href = "/admin/login";
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="green" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 ">
            <AvatarImage src="#" alt="Avatar" />
            <AvatarFallback className="bg-green-500 text-white!">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user?.name || "Admin"}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
