import { connectDB } from "@/lib/mongoose";
import { Event } from "@/models/Event";
import { EventForm } from "@/components/admin/events/event-form";
import { notFound } from "next/navigation";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;
  const event = (await Event.findById(id).lean()) as any;
  if (!event) notFound();

  return (
    <EventForm
      mode="edit"
      initialData={{
        _id: event._id.toString(),
        bannerImage: event.bannerImage,
        title: event.title,
        slug: event.slug,
        subtitle: event.subtitle,
        eventDetails: event.eventDetails,
        about: event.about,
        highlights: event.highlights,
        faqs: event.faqs,
        sponsorTiers: event.sponsorTiers,
        published: event.published,
      }}
    />
  );
}
