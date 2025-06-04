"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown, Eye, EyeOff } from "lucide-react"
import { CryptoChart } from "@/components/crypto-chart"

interface FearGreedData {
  value: string
  value_classification: string
  timestamp: string
  time_until_update: string
}

interface CryptoData {
  id: string
  name: string
  symbol: string
  current_price: number
  price_change_percentage_24h: number
  market_cap: number
  total_volume: number
  image: string
}

export function ListingsDashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [filteredData, setFilteredData] = useState<CryptoData[]>([])
  const [fearGreedData, setFearGreedData] = useState<FearGreedData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)
  const [showGreedIndex, setShowGreedIndex] = useState(false)
  const [showFearIndex, setShowFearIndex] = useState(false)

  const fetchCryptoData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/crypto/ticker")
      const data = await response.json()
      setCryptoData(data)
      setFilteredData(data)
      if (data.length > 0) {
        setSelectedCrypto(data[0])
      }
    } catch (error) {
      console.error("Error fetching crypto data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFearGreedData = async () => {
    try {
      const response = await fetch("/api/crypto/fear-greed")
      const data = await response.json()
      if (data.data && data.data.length > 0) {
        setFearGreedData(data.data[0])
      }
    } catch (error) {
      console.error("Error fetching Fear & Greed data:", error)
    }
  }

  useEffect(() => {
    fetchCryptoData()
    fetchFearGreedData()
  }, [])

  useEffect(() => {
    const filtered = cryptoData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredData(filtered)
  }, [searchTerm, cryptoData])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(price)
  }

  const getFearGreedColor = (value: string) => {
    const numValue = Number.parseInt(value)
    if (numValue <= 25) return "text-red-500"
    if (numValue <= 45) return "text-orange-500"
    if (numValue <= 55) return "text-yellow-500"
    if (numValue <= 75) return "text-green-500"
    return "text-green-600"
  }

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Crypto Data Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Crypto Data</CardTitle>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={fetchCryptoData} disabled={loading}>
                  {loading ? "Loading..." : "Fetch Data"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredData.slice(0, 10).map((crypto) => (
                  <div
                    key={crypto.id}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedCrypto?.id === crypto.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedCrypto(crypto)}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-6 h-6" />
                      <div>
                        <div className="font-medium text-sm">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{formatPrice(crypto.current_price)}</div>
                      <div className="flex items-center space-x-1">
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        )}
                        <Badge
                          variant={crypto.price_change_percentage_24h >= 0 ? "default" : "destructive"}
                          className="text-xs"
                        >
                          {crypto.price_change_percentage_24h.toFixed(2)}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedCrypto && <CryptoChart cryptoId={selectedCrypto.id} />}
        </div>

        {/* Fear & Greed Index Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fear and Greed Index</CardTitle>
              <Button onClick={fetchFearGreedData} variant="outline">
                Fetch Fear and Greed Index
              </Button>
            </CardHeader>
            <CardContent>
              {fearGreedData ? (
                <div className="text-center space-y-4">
                  <div className="text-6xl font-bold">
                    <span className={getFearGreedColor(fearGreedData.value)}>{fearGreedData.value}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xl font-semibold">{fearGreedData.value_classification}</div>
                    <div className="text-sm text-muted-foreground">
                      Last updated: {new Date(Number.parseInt(fearGreedData.timestamp) * 1000).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-4 rounded-full">
                    <div
                      className="h-4 w-2 bg-white border-2 border-black rounded-full relative"
                      style={{ left: `${fearGreedData.value}%`, transform: "translateX(-50%)" }}
                    />
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  Click the button to fetch Fear & Greed Index data
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Greed Index</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGreedIndex(!showGreedIndex)}
                  className="w-full"
                >
                  {showGreedIndex ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showGreedIndex ? "Hide" : "Show"} Greed Index
                </Button>
              </CardHeader>
              <CardContent>
                {showGreedIndex && (
                  <img
                    src="https://alternative.me/crypto/fear-and-greed-index.png"
                    alt="Latest Crypto Greed Index"
                    className="w-full rounded-lg"
                  />
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Fear Index</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowFearIndex(!showFearIndex)} className="w-full">
                  {showFearIndex ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                  {showFearIndex ? "Hide" : "Show"} Fear Index
                </Button>
              </CardHeader>
              <CardContent>
                {showFearIndex && (
                  <img
                    src="https://alternative.me/images/fng/crypto-fear-and-greed-index-2020-5-13.png"
                    alt="Crypto Fear Index"
                    className="w-full rounded-lg"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
