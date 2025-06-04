"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Users, Heart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  user: string
  message: string
  timestamp: Date
  liked: boolean
}

export function ChatRoom() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [username, setUsername] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleJoinChat = () => {
    if (username.trim().length > 1) {
      setIsConnected(true)
      setOnlineUsers(Math.floor(Math.random() * 50) + 10) // Simulate online users
      toast({
        title: "Connected!",
        description: `Welcome to the chat, ${username}!`,
      })

      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        user: "System",
        message: `${username} joined the chat`,
        timestamp: new Date(),
        liked: false,
      }
      setMessages((prev) => [...prev, welcomeMessage])
    } else {
      toast({
        title: "Invalid Username",
        description: "Please enter a username with at least 2 characters.",
        variant: "destructive",
      })
    }
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim() && isConnected) {
      const message: Message = {
        id: Date.now().toString(),
        user: username,
        message: newMessage.trim(),
        timestamp: new Date(),
        liked: false,
      }
      setMessages((prev) => [...prev, message])
      setNewMessage("")

      // Simulate receiving messages from other users
      setTimeout(
        () => {
          const responses = [
            "Great analysis!",
            "What do you think about Bitcoin today?",
            "The market is looking bullish!",
            "Thanks for sharing!",
            "Interesting perspective on crypto trends",
            "Anyone watching Ethereum?",
            "The volatility is crazy today!",
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            user: `User${Math.floor(Math.random() * 1000)}`,
            message: randomResponse,
            timestamp: new Date(),
            liked: false,
          }
          setMessages((prev) => [...prev, botMessage])
        },
        Math.random() * 3000 + 1000,
      )
    }
  }

  const handleLikeMessage = (messageId: string) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, liked: !msg.liked } : msg)))
  }

  if (!isConnected) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Join the Chat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleJoinChat()}
          />
          <Button onClick={handleJoinChat} className="w-full">
            Join Chat
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto h-[600px] flex flex-col overflow-hidden">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle>Public Chat</CardTitle>
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{onlineUsers}</span>
          </Badge>
        </div>
      </CardHeader>

      {/* Scrollable Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.user === username ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.user === username
                  ? "bg-primary text-primary-foreground"
                  : message.user === "System"
                    ? "bg-muted text-center text-muted-foreground text-sm"
                    : "bg-muted"
              }`}
            >
              {message.user !== "System" && message.user !== username && (
                <div className="text-xs font-semibold mb-1 text-primary">{message.user}</div>
              )}
              <div className="break-words">{message.message}</div>
              {message.user !== "System" && (
                <div className="flex items-center justify-between mt-2">
                  <div className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => handleLikeMessage(message.id)}
                  >
                    <Heart className={`w-3 h-3 ${message.liked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4 mr-1" />
            Send
          </Button>
        </form>
      </div>
    </Card>

  )
}
