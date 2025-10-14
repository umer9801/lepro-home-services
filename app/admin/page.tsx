"use client"

import { useState } from "react"

import type React from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Booking } from "@/lib/types"

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

export default function AdminPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true)
      setError("")
    } else {
      setError("Invalid credentials. Please use the demo username and password shown below.")
    }
  }

  if (loggedIn) {
    return (
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12 md:py-16">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome, Admin. This is a demo dashboard.</p>
        <div className="grid gap-6 md:grid-cols-3 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>New Booking Requests</CardTitle>
              <CardDescription>Recent online submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Connect to a database to show live data.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>This week</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Charts can be added later.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Team Notes</CardTitle>
              <CardDescription>Internal updates</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Keep your team aligned across Canada.</p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-10">
          <h2 className="text-xl font-semibold">Bookings</h2>
          <p className="text-muted-foreground text-sm mt-1">Accept or cancel incoming requests.</p>
          <AdminBookingsTable />
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-md px-4 sm:px-6 py-12 md:py-16">
      <Card>
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>Restricted access</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button type="submit" className="btn-glow">
              Login
            </Button>
          </form>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Demo credentials:</p>
            <p>
              Username: <span className="font-medium">{ADMIN_USERNAME}</span>
            </p>
            <p>
              Password: <span className="font-medium">{ADMIN_PASSWORD}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminBookingsTable() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data, isLoading, mutate } = useSWR<{ bookings: Booking[] }>("/api/bookings", fetcher, {
    refreshInterval: 3000,
  })

  async function updateStatus(id: string, status: "accepted" | "cancelled") {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (res.ok) mutate()
  }

  if (isLoading) return <p className="text-sm text-muted-foreground mt-4">Loading bookings...</p>
  const items = data?.bookings ?? []

  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground mt-4">No bookings yet.</p>
  }

  return (
    <div className="mt-4 border rounded-lg overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Date/Time</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((b) => (
            <TableRow key={b.id}>
              <TableCell className="font-medium">{b.name}</TableCell>
              <TableCell>
                <div className="text-sm">{b.email}</div>
                <div className="text-xs text-muted-foreground">{b.phone}</div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{b.date}</div>
                <div className="text-xs text-muted-foreground">{b.time}</div>
              </TableCell>
              <TableCell>{b.whatsapp ? "Yes" : "No"}</TableCell>
              <TableCell className="capitalize">{b.status}</TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    size="sm"
                    className="btn-glow"
                    disabled={b.status === "accepted"}
                    onClick={() => updateStatus(b.id, "accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateStatus(b.id, "cancelled")}
                    disabled={b.status === "cancelled"}
                  >
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
