import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SettingsPanel } from "@/components/settings-panel"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Customize your experience and preferences</p>
        </div>
        <SettingsPanel />
      </main>
      <Footer />
    </div>
  )
}
