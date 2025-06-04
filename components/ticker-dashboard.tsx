"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, TrendingDown } from "lucide-react"
import { CryptoChart } from "@/components/crypto-chart"

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

export function TickerDashboard() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [filteredData, setFilteredData] = useState<CryptoData[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)

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

  useEffect(() => {
    fetchCryptoData()
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

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`
    return `$${marketCap.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search cryptocurrencies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={fetchCryptoData} disabled={loading}>
          {loading ? "Loading..." : "Refresh Data"}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cryptocurrency Prices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredData.map((crypto) => (
                  <div
                    key={crypto.id}
                    className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedCrypto?.id === crypto.id ? "bg-muted" : "hover:bg-muted/50"
                    }`}
                    onClick={() => setSelectedCrypto(crypto)}
                  >
                    <div className="flex items-center space-x-3">
                      <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-8 h-8" />
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{formatPrice(crypto.current_price)}</div>
                      <div className="flex items-center space-x-1">
                        {crypto.price_change_percentage_24h >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
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
        </div>

        <div className="space-y-6">
          {selectedCrypto && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <img
                      src={selectedCrypto.image || "/placeholder.svg"}
                      alt={selectedCrypto.name}
                      className="w-6 h-6"
                    />
                    <span>{selectedCrypto.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Current Price</div>
                    <div className="text-2xl font-bold">{formatPrice(selectedCrypto.current_price)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">24h Change</div>
                    <div
                      className={`text-lg font-semibold ${
                        selectedCrypto.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {selectedCrypto.price_change_percentage_24h.toFixed(2)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                    <div className="text-lg font-semibold">{formatMarketCap(selectedCrypto.market_cap)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">24h Volume</div>
                    <div className="text-lg font-semibold">{formatMarketCap(selectedCrypto.total_volume)}</div>
                  </div>
                </CardContent>
              </Card>

              <CryptoChart cryptoId={selectedCrypto.id} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
