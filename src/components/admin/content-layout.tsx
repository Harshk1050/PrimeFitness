import { Navbar } from "./navbar";
import type { Session } from "next-auth";

interface ContentLayoutProps {
  title?: string;
  children: React.ReactNode;
  session: Session;
}

export function ContentLayout({ title = "", children, session }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} session={session} />
      <div className="container w-full! flex flex-1 flex-col pt-8 pb-8 px-2 sm:px-8">
        <div className="border border-gray-300 w-full! overflow-auto mb-6 pb-4 px-2 sm:px-4 rounded-md bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
