import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FeedbackForm } from "@/components/feedback-form"

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Feedback</h1>
          <p className="text-muted-foreground">Your opinion matters to us. Help us improve our platform.</p>
        </div>
        <FeedbackForm />
      </main>
      <Footer />
    </div>
  )
}
