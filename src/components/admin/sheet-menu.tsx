import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Menu } from "./menu";
import { MenuIcon } from "lucide-react";
import type { Session } from "next-auth";

export function SheetMenu({ session }: { session: Session }) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden " asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>

      <SheetContent
        className="sm:w-72 px-3 h-full flex flex-col border border-red-500 custom-scrollbar"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="font-bold text-lg">
            <img
              src="/FullLogo-Photoroom.svg"
              alt="Prime Fitness logo"
              className="inline-block h-10 w-10 object-contain"
            />
          </SheetTitle>
        </SheetHeader>
        <Menu isOpen session={session} />
      </SheetContent>
    </Sheet>
  );
}
