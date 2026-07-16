import { LayoutGrid, FileText, CalendarDays, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Content",
      menus: [
        {
          href: "/admin/blogs",
          label: "Blogs",
          icon: FileText,
        },
        {
          href: "/admin/events",
          label: "Events",
          icon: CalendarDays,
        },
        {
          href: "/admin/donations",
          label: "Donations",
          icon: HeartHandshake,
        },
      ],
    },
  ];
}
