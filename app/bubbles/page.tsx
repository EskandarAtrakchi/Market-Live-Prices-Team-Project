import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BubblesViewer } from "@/components/bubbles-viewer"

export default function BubblesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Crypto Bubbles</h1>
          <p className="text-muted-foreground">Interactive cryptocurrency market visualization with live chat</p>
        </div>
        <BubblesViewer />
      </main>
      <Footer />
    </div>
  )
}
