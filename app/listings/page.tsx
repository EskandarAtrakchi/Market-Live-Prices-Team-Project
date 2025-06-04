import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ListingsDashboard } from "@/components/listings-dashboard"

export default function ListingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Crypto Listings</h1>
          <p className="text-muted-foreground">Comprehensive cryptocurrency data and Fear & Greed Index</p>
        </div>
        <ListingsDashboard />
      </main>
      <Footer />
    </div>
  )
}
