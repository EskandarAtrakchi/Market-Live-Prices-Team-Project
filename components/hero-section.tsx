import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-background to-muted py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="text-primary font-semibold mb-4">Market live crypto prices</p>
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">The best solution for volatility control</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Track real-time cryptocurrency prices, analyze market trends, and make informed decisions with our
              comprehensive crypto tracking platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="/ticker">View Live Prices</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/bubbles">Explore Bubbles</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://cdn.pixabay.com/animation/2023/07/26/00/20/00-20-51-158_512.gif"
                  alt="Bitcoin Animation"
                  className="w-full rounded-full shadow-lg"
                />
                <img
                  src="https://media1.tenor.com/m/JYQs3LWRKgcAAAAC/btc-bitcoin.gif"
                  alt="BTC Animation"
                  className="w-full rounded-full shadow-lg"
                />
              </div>
              <div className="pt-8">
                <img
                  src="https://media.tenor.com/u8acCr9Qq-gAAAAM/bitcoin-crypto.gif"
                  alt="Crypto Animation"
                  className="w-full rounded-full shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
