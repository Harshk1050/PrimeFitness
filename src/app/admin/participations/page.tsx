import DeleteParticipantButton from "./delete-button";
import { Event } from "@/models/Event";
import { Participate } from "@/models/Participate";
import { connectDB } from "@/lib/mongoose";

export default async function AdminParticipationsPage() {
  await connectDB();

  const [participations, events] = await Promise.all([
    Participate.find().sort({ createdAt: -1 }).lean(),
    Event.find({}, "_id title").lean(),
  ]);

  const eventMap = Object.fromEntries(
    events.map((e: any) => [e._id.toString(), e.title]),
  );

  const grouped = participations.reduce<
    Record<string, { title: string; items: typeof participations }>
  >((acc, p: any) => {
    const key = p.eventId;
    if (!acc[key])
      acc[key] = { title: eventMap[key] ?? "Unknown Event", items: [] };
    acc[key].items.push(p);
    return acc;
  }, {});

  return (
    <div className="py-6 space-y-6">
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
          Participations
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {participations.length} total participant
          {participations.length !== 1 ? "s" : ""}
        </p>
      </div>

      {participations.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No participations yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([eventId, group]) => (
            <div
              key={eventId}
              className="border border-slate-200 rounded-xl overflow-hidden"
            >
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                <p className="font-bold text-slate-800 text-sm">
                  {group.title}
                </p>
                <p className="text-xs text-slate-400">
                  {group?.items.length} participant
                  {group?.items.length !== 1 ? "s" : ""}
                </p>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-white border-b border-slate-100">
                  <tr>
                    <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                      Email
                    </th>
                    <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:table-cell">
                      Phone
                    </th>
                    <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {group.items.map((p: any) => (
                    <tr key={p._id.toString()} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">
                        {p?.name || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-500 hidden md:table-cell">
                        {p?.email || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">
                        {p?.phone || "-"}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                        {new Date(p.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DeleteParticipantButton id={p._id.toString()} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
