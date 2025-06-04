import { Card, CardContent } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Yonas Haftom",
    role: "Frontend Developer",
    description:
      "Frontend developer, managing the tickers page, retrieving real time data of crypto prices and show statistics using graph charts.",
    image: "/assets/img/team/yonas.jpeg",
  },
  {
    name: "Alex Maryus",
    role: "Frontend Developer",
    description:
      "Front end developer, developing frontend of chat page and contributor to frontend design of the main page.",
    image: "/assets/img/team/alex.jpeg",
  },
  {
    name: "Joshua Tupas",
    role: "Integration Specialist",
    description:
      "Integrating with crypto bubbles, Fear & Greed Index and retrieval of Crypto ID and comparing them with interactive chart.",
    image: "/assets/img/team/joshua.jpeg",
  },
  {
    name: "Eskandar Atrakchi",
    role: "Full-Stack Developer",
    description:
      "End to end development building backend server and responsible for feedback page with tracking mechanism.",
    image: "https://avatars.githubusercontent.com/u/102361045?v=4",
  },
]

export function TeamSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4">Team Members</p>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">End to End Roles</h2>
          <p className="text-xl text-muted-foreground">No matter the project, our team can handle it.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-1">{member.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{member.role}</p>
                <p className="text-sm">{member.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
