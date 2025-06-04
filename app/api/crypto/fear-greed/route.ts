import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch("https://api.alternative.me/fng/", {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch Fear & Greed data")
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Fear & Greed data:", error)
    return NextResponse.json({ error: "Failed to fetch Fear & Greed data" }, { status: 500 })
  }
}
