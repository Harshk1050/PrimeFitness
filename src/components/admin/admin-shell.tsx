"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { ContentLayout } from "./content-layout";
import type { Session } from "next-auth";

export function AdminShell({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} session={session} />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] ease-in-out duration-300",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        <ContentLayout session={session}>{children}</ContentLayout>
      </main>
    </>
  );
}
