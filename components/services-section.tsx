import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, TrendingUp, MessageSquare, BarChart3 } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Bell,
    title: "Real-time Data",
    description:
      "Compare multiple cryptocurrencies and their prices in real-time with live market data and interactive charts.",
    link: "/ticker",
    linkText: "View Ticker",
  },
  {
    icon: BarChart3,
    title: "Crypto Analysis",
    description:
      "Interactive charts to compare all cryptocurrency IDs and analyze market trends with comprehensive data.",
    link: "/bubbles",
    linkText: "View Bubbles",
  },
  {
    icon: MessageSquare,
    title: "Global Chat",
    description: "Connect and exchange opinions with cryptocurrency enthusiasts from around the world in real-time.",
    link: "/chat",
    linkText: "Join Chat",
  },
  {
    icon: TrendingUp,
    title: "Market Insights",
    description: "Get detailed market insights, fear & greed index, and comprehensive cryptocurrency listings.",
    link: "/listings",
    linkText: "View Listings",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4">Our Services</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">What we can do for you</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive cryptocurrency tracking and analysis tools for informed trading decisions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="relative group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{service.description}</CardDescription>
                <Button asChild variant="outline" className="w-full">
                  <Link href={service.link}>{service.linkText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
