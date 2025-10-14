import { NextResponse } from "next/server"
import { bookingStore } from "@/lib/bookings-store"
import type { BookingStatus } from "@/lib/types"

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = (await req.json()) as { status?: BookingStatus }
    if (!body?.status) {
      return NextResponse.json({ error: "Missing status" }, { status: 400 })
    }
    if (!["pending", "accepted", "cancelled"].includes(body.status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 })
    }
    const updated = bookingStore.updateStatus(params.id, body.status)
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ booking: updated })
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
