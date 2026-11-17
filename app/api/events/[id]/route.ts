import { events } from "@/data/events";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/events/[id]">,
) {
  const { id } = await context.params;
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return Response.json({ pesan: "Event tidak ditemukan" }, { status: 404 });
  }

  return Response.json(event);
}
