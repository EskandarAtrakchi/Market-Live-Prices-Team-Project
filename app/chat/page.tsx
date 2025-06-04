import { Navigation } from "@/components/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatRoom } from "@/components/chat-room"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Global Crypto Chat</h1>
          <p className="text-muted-foreground">Connect with cryptocurrency enthusiasts worldwide</p>
        </div>
        <ChatRoom />
      </main>
      <Footer />
    </div>
  )
}
