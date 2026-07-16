import { Heart, Users } from "lucide-react";
import { type ReactElement } from "react";

export const IconCalendar = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
};
export const IconClock = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
export const IconPin = ({ className = "w-5 h-5" }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
};
export const IconRun = ({ className = "w-5 h-5" }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 20l2-6-2-2 1-5 4 1 2 3h3M6 12l3-2 3 2-2 3-4 1"
      />
    </svg>
  );
};
export const IconHeart = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21s-6.7-4.35-9.3-8.2C.8 9.7 1.9 6 5.2 5c2-.6 3.9.3 4.8 2 1-1.7 2.8-2.6 4.8-2 3.3 1 4.4 4.7 2.5 7.8C18.7 16.65 12 21 12 21z" />
    </svg>
  );
};
export const IconMail = ({ className = "w-5 h-5" }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
};
export const IconCrown = ({
  className = "w-5 h-5",
}: {
  className?: string;
}) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8zm2 13h14v2H5v-2z" />
    </svg>
  );
};
export const IconStar = ({ className = "w-5 h-5" }: { className?: string }) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
};

export const FEATURE_ICONS: Record<string, ReactElement> = {
  family: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 11a3 3 0 100-6 3 3 0 000 6zm7-1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20c0-3 3-5 7-5s7 2 7 5m1-8c2.8 0 5 1.6 5 4.5"
      />
    </svg>
  ),
  vendor: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M4 8l1-4h14l1 4M4 8v11a1 1 0 001 1h14a1 1 0 001-1V8M4 8h16M9 21v-6h6v6"
      />
    </svg>
  ),
  music: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 18V5l11-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm11-2a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  gift: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M20 12v9H4v-9M2 7h20v5H2V7zm10 0V22M12 7C10 3 6 3 6 6s3 1 6 1zm0 0c2-4 6-4 6-1s-3 1-6 1z"
      />
    </svg>
  ),
  map: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 20l-6 2V6l6-2 6 2 6-2v16l-6 2-6-2zm0-16v16m6-14v16"
      />
    </svg>
  ),
  kids: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="7" r="3" strokeWidth={1.7} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M8 21c0-3 2-5 4-5s4 2 4 5"
      />
    </svg>
  ),
  puzzle: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 4h4v2.5a1.5 1.5 0 003 0V4h4v4h-2.5a1.5 1.5 0 000 3H20v4h-4v-2.5a1.5 1.5 0 00-3 0V15H9v-4H6.5a1.5 1.5 0 010-3H9V4z"
      />
    </svg>
  ),
  volunteer: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M12 21s-6-4.5-8.5-8C1.5 9.5 3 6 6.5 6c1.7 0 3 .9 3.5 2 .5-1.1 1.8-2 3.5-2 1 0 1.9.3 2.6.8M14 4l3 3-5 5-3-3M20 10l1 1-3 3-1-1"
      />
    </svg>
  ),
  crown: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8zm2 13h14v2H5v-2z" />
    </svg>
  ),
  star: (
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  ),
};

export const CORE_VALUE_ICONS: Record<string, ReactElement> = {
  Inclusion: (
    <div className="flex flex-col items-center gap-3">
      <div className="border-2 border-[#f0a500] rounded-full p-4">
        <Users className="w-10 h-10 text-[#f0a500]" />
      </div>

      <h3 className="font-semibold text-slate-700">Inclusion</h3>
      <p className="text-sm text-slate-500">
        Creating opportunities for everyone.
      </p>
    </div>
  ),

  Awareness: (
    <div className="flex flex-col items-center">
      <div className="border-2 border-[#f0a500] rounded-full p-4">
        <Heart className="w-10 h-10 text-[#f0a500]" />
      </div>
      <h3 className="font-semibold text-slate-700">Awareness</h3>
      <p className="text-sm text-slate-500">
        Building understanding through community.
      </p>
    </div>
  ),

  Community: (
    <div className="flex flex-col items-center">
      <div className="border-2 border-[#f0a500] rounded-full p-4">
        <Users className="w-10 h-10 text-[#f0a500]" />
      </div>

      <h3 className="font-semibold text-slate-700">Community</h3>
      <p className="text-sm text-slate-500">
        Supporting local families together.
      </p>
    </div>
  ),

  Acceptance: (
    <div className="flex flex-col items-center">
      <div className="border-2 border-[#f0a500] rounded-full p-4">
        <IconStar className="w-10 h-10 text-[#f0a500]" />
      </div>
      <h3 className="font-semibold text-slate-700">Acceptance</h3>
      <p className="text-sm text-slate-500">
        Building understanding through community.
      </p>
    </div>
  ),
};
