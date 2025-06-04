"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ChatRoom } from "@/components/chat-room"

export function BubblesViewer() {
  return (
    <div className="grid lg:grid-cols-4 gap-6 h-[800px]">
      <div className="lg:col-span-3">
        <Card className="h-full">
          <CardContent className="p-0 h-full">
            <iframe
              src="https://cryptobubbles.net"
              className="w-full h-full border-0 rounded-lg"
              title="Crypto Bubbles"
            />
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <div className="h-full">
          <ChatRoom />
        </div>
      </div>
    </div>
  )
}
