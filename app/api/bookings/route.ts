import { NextResponse } from "next/server"
import { bookingStore } from "@/lib/bookings-store"
import type { Booking } from "@/lib/types"

export async function GET() {
  const items = bookingStore.list()
  return NextResponse.json({ bookings: items })
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as Partial<Booking>
    const { name, email, phone, date, time, whatsapp = false } = data

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing required fields: name, email, date, time" }, { status: 400 })
    }

    const created = bookingStore.add({
      name,
      email,
      phone: phone ?? "",
      date,
      time,
      whatsapp: Boolean(whatsapp),
    })

    return NextResponse.json({ booking: created }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }
}
