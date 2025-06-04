"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import { Moon, Sun, Wifi, WifiOff } from "lucide-react"

export function SettingsPanel() {
  const { theme, setTheme } = useTheme()
  const [isOnline, setIsOnline] = useState(true) // default to true initially
  const { toast } = useToast()

  useEffect(() => {
    // Access navigator only on client after mount
    setIsOnline(navigator.onLine)
  }, [])

  const checkConnection = () => {
    const online = navigator.onLine
    setIsOnline(online)
    toast({
      title: online ? "Connected" : "Disconnected",
      description: online
        ? "Your internet connection is working properly."
        : "You appear to be offline.",
      variant: online ? "default" : "destructive",
    })
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    toast({
      title: "Theme Changed",
      description: `Switched to ${theme === "dark" ? "light" : "dark"} mode.`,
    })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {theme === "dark" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Customize the visual appearance of the application</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Dark Mode</div>
              <div className="text-sm text-muted-foreground">Toggle between light and dark themes</div>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            <span>Connection</span>
          </CardTitle>
          <CardDescription>Check your internet connection status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Connection Status</div>
              <div className={`text-sm ${isOnline ? "text-green-600" : "text-red-600"}`}>
                {isOnline ? "Connected" : "Disconnected"}
              </div>
            </div>
            <Button onClick={checkConnection} variant="outline">
              Check Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage your notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Price Alerts</div>
              <div className="text-sm text-muted-foreground">Get notified when prices change significantly</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Chat Messages</div>
              <div className="text-sm text-muted-foreground">Receive notifications for new chat messages</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Market Updates</div>
              <div className="text-sm text-muted-foreground">Stay informed about market trends</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data & Privacy</CardTitle>
          <CardDescription>Control your data and privacy settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Analytics</div>
              <div className="text-sm text-muted-foreground">Help improve the app by sharing usage data</div>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Personalization</div>
              <div className="text-sm text-muted-foreground">Allow personalized content and recommendations</div>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
