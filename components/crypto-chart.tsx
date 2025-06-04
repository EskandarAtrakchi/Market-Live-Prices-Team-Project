"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface CryptoChartProps {
  cryptoId: string
}

interface ChartData {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string
    backgroundColor: string
    tension: number
  }[]
}

export function CryptoChart({ cryptoId }: CryptoChartProps) {
  const [chartData, setChartData] = useState<ChartData | null>(null)
  const [timeframe, setTimeframe] = useState("7")
  const [loading, setLoading] = useState(false)

  const fetchChartData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/crypto/chart?id=${cryptoId}&days=${timeframe}`)
      const data = await response.json()

      const labels = data.prices.map((price: [number, number]) => new Date(price[0]).toLocaleDateString())
      const prices = data.prices.map((price: [number, number]) => price[1])

      setChartData({
        labels,
        datasets: [
          {
            label: "Price (USD)",
            data: prices,
            borderColor: "rgb(59, 130, 246)",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            tension: 0.1,
          },
        ],
      })
    } catch (error) {
      console.error("Error fetching chart data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (cryptoId) {
      fetchChartData()
    }
  }, [cryptoId, timeframe])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Price Chart (${timeframe} days)`,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart</CardTitle>
        <div className="flex space-x-2">
          {["1", "7", "30", "90"].map((days) => (
            <Button
              key={days}
              variant={timeframe === days ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(days)}
            >
              {days}d
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">Loading chart...</div>
          </div>
        ) : chartData ? (
          <div className="h-64">
            <Line data={chartData} options={options} />
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <div className="text-muted-foreground">No chart data available</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
