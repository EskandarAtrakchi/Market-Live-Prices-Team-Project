import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TickerDashboard } from "@/components/ticker-dashboard"

export default function TickerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Crypto Ticker Data</h1>
          <p className="text-muted-foreground">Real-time cryptocurrency prices and market data</p>
        </div>
        <TickerDashboard />
      </main>
      <Footer />
    </div>
  )
}
