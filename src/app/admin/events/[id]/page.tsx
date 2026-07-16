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

  const clean = JSON.parse(JSON.stringify(event));

  return (
    <EventForm
      mode="edit"
      initialData={{
        _id: clean._id,
        bannerImage: clean.bannerImage,
        title: clean.title,
        slug: clean.slug,
        subtitle: clean.subtitle,
        eventDetails: clean.eventDetails,
        about: clean.about,
        highlights: clean.highlights,
        coreValues: clean.coreValues,
        faqs: clean.faqs,
        sponsorTiers: clean.sponsorTiers,
        published: clean.published,
        tags: clean.tags,
        metaTitle: clean.metaTitle,
        canonicalUrl: clean.canonicalUrl,
        metaDescription: clean.metaDescription,
      }}
    />
  );
}
