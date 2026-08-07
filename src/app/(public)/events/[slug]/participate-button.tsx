"use client";

import ParticipateDialogBox from "./participate";
import { useState } from "react";

export default function ParticipateButton({
  slug,
  eventId,
  eventTitle,
}: {
  slug: string;
  eventId: string;
  eventTitle: string;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border-2 border-[#f0a500]/60 text-white px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
      >
        Participate
      </div>

      <ParticipateDialogBox
        slug={slug}
        eventId={eventId}
        eventTitle={eventTitle}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
