import { Donation } from "@/models/Donation";
import { connectDB } from "@/lib/mongoose";

export default async function AdminDonationsPage() {
  await connectDB();
  const donations = await Donation.find().sort({ createdAt: -1 }).lean();

  const total = donations.reduce((sum, d) => sum + d.amount, 0);

  // Group by event
  const grouped = donations.reduce<Record<string, { title: string; slug: string; items: typeof donations }>>((acc, d) => {
    if (!acc[d.eventId]) acc[d.eventId] = { title: d.eventTitle, slug: d.eventSlug, items: [] };
    acc[d.eventId].items.push(d);
    return acc;
  }, {});

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">Donations</h2>
          <p className="text-sm text-slate-500 mt-1">
            {donations.length} total · ${total.toFixed(2)} raised
          </p>
        </div>
      </div>

      {donations.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No donations yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([eventId, group]) => {
            const groupTotal = group.items.reduce((s, d) => s + d.amount, 0);
            return (
              <div key={eventId} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{group.title}</p>
                    <p className="text-xs text-slate-400 font-mono">{group.slug}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-green-600">${groupTotal.toFixed(2)}</p>
                    <p className="text-xs text-slate-400">{group.items.length} donation{group.items.length !== 1 ? "s" : ""}</p>
                  </div>
                </div>
                <table className="w-full text-sm">
                  <thead className="bg-white border-b border-slate-100">
                    <tr>
                      <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Email</th>
                      <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Message</th>
                      <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">PayPal Order ID</th>
                      <th className="text-left px-4 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {group.items.map((d: any) => (
                      <tr key={d._id.toString()} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-800">{d.name}</td>
                        <td className="px-4 py-3 text-slate-500 hidden md:table-cell">{d.email}</td>
                        <td className="px-4 py-3 font-bold text-green-600">${d.amount.toFixed(2)}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs hidden lg:table-cell max-w-[180px] truncate">{d.message || "—"}</td>
                        <td className="px-4 py-3 text-slate-400 font-mono text-xs hidden md:table-cell">{d.paypalOrderId}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs whitespace-nowrap">
                          {new Date(d.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
