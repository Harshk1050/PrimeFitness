import { Eye, Pencil, Plus } from "lucide-react";

import { DeleteEventButton } from "@/components/admin/events/delete-event-button";
import { Event } from "@/models/Event";
import Link from "next/link";
import { connectDB } from "@/lib/mongoose";

export default async function AdminEventsPage() {
  await connectDB();
  const events = await Event.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            Events
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {events.length} total events
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
        >
          <Plus size={16} /> New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No events yet</p>
          <p className="text-sm mt-1">Create your first event</p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs">
                  Title
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs hidden md:table-cell">
                  Slug
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs hidden md:table-cell">
                  Date
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs">
                  Status
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {events.map((event: any) => (
                <tr
                  key={event._id.toString()}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900 line-clamp-1">
                      {event.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {event.subtitle}
                    </p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-slate-400 font-mono text-xs">
                    {event.slug}
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell text-slate-500 text-xs">
                    {event.eventDetails?.date || "—"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold ${event.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {event.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {event.published && (
                        <Link
                          href={`/events/${event.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/events/${event._id}`}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteEventButton id={event._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
