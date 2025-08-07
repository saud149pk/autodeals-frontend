import { NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Sample car database
const carDatabase = [
  {
    make: "Toyota",
    model: "RAV4 Hybrid",
    year: 2023,
    price: "$32,000",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Hybrid", "AWD", "Safety Sense 2.0"],
    mpg: "41 city / 38 hwy",
    horsepower: 219,
    type: "SUV",
    size: "Compact",
    luxury: false,
    electric: false,
    hybrid: true,
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: "$23,950",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Fuel Efficient", "Honda Sensing", "Apple CarPlay"],
    mpg: "33 city / 42 hwy",
    horsepower: 158,
    type: "Sedan",
    size: "Compact",
    luxury: false,
    electric: false,
    hybrid: false,
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    price: "$42,990",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Electric", "Autopilot", "358 mile range"],
    mpg: "132 MPGe",
    horsepower: 283,
    type: "Sedan",
    size: "Mid-size",
    luxury: true,
    electric: true,
    hybrid: false,
  },
  {
    make: "Ford",
    model: "F-150",
    year: 2023,
    price: "$34,585",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Towing Capacity", "Pro Power Onboard", "SYNC 4"],
    mpg: "25 city / 26 hwy",
    horsepower: 400,
    type: "Truck",
    size: "Full-size",
    luxury: false,
    electric: false,
    hybrid: false,
  },
  {
    make: "BMW",
    model: "3 Series",
    year: 2023,
    price: "$43,800",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Luxury", "Sport Mode", "iDrive 7.0"],
    mpg: "26 city / 36 hwy",
    horsepower: 255,
    type: "Sedan",
    size: "Compact",
    luxury: true,
    electric: false,
    hybrid: false,
  },
  {
    make: "Mazda",
    model: "CX-5",
    year: 2023,
    price: "$26,700",
    image: "/placeholder.svg?height=192&width=384",
    features: ["AWD", "Skyactiv Technology", "i-Activsense"],
    mpg: "24 city / 30 hwy",
    horsepower: 187,
    type: "SUV",
    size: "Compact",
    luxury: false,
    electric: false,
    hybrid: false,
  },
  {
    make: "Audi",
    model: "Q5",
    year: 2023,
    price: "$43,500",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Quattro AWD", "Virtual Cockpit", "Premium Audio"],
    mpg: "23 city / 28 hwy",
    horsepower: 261,
    type: "SUV",
    size: "Compact",
    luxury: true,
    electric: false,
    hybrid: false,
  },
  {
    make: "Hyundai",
    model: "Tucson Hybrid",
    year: 2023,
    price: "$30,900",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Hybrid", "BlueLink", "SmartSense"],
    mpg: "38 city / 38 hwy",
    horsepower: 226,
    type: "SUV",
    size: "Compact",
    luxury: false,
    electric: false,
    hybrid: true,
  },
  {
    make: "Chevrolet",
    model: "Bolt EV",
    year: 2023,
    price: "$26,500",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Electric", "259 mile range", "Fast Charging"],
    mpg: "131 MPGe",
    horsepower: 200,
    type: "Hatchback",
    size: "Compact",
    luxury: false,
    electric: true,
    hybrid: false,
  },
  {
    make: "Porsche",
    model: "911",
    year: 2023,
    price: "$106,100",
    image: "/placeholder.svg?height=192&width=384",
    features: ["Sports Car", "PDK Transmission", "Launch Control"],
    mpg: "18 city / 25 hwy",
    horsepower: 379,
    type: "Sports Car",
    size: "Compact",
    luxury: true,
    electric: false,
    hybrid: false,
  },
]

// Allow responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()
    
    // Simple mock response - replace with actual AI integration
    const lastMessage = messages[messages.length - 1]
    
    let response = "I'd be happy to help you find a car! "
    
    if (lastMessage.content.toLowerCase().includes("suv")) {
      response += "I see you're interested in SUVs. We have several great options including the Ford F-150 which offers excellent towing capacity and 4WD capability."
    } else if (lastMessage.content.toLowerCase().includes("sedan")) {
      response += "For sedans, I'd recommend checking out our Toyota Camry - it's a reliable hybrid with great fuel economy, or the Honda Civic which offers modern tech features."
    } else if (lastMessage.content.toLowerCase().includes("budget") || lastMessage.content.toLowerCase().includes("cheap")) {
      response += "For budget-friendly options, the Honda Civic at $24,900 offers great value with modern features and reliability."
    } else if (lastMessage.content.toLowerCase().includes("fuel") || lastMessage.content.toLowerCase().includes("mpg")) {
      response += "For fuel efficiency, the Toyota Camry hybrid gets an impressive 32/41 MPG and is very reliable."
    } else {
      response += "Could you tell me more about what you're looking for? For example, do you prefer SUVs, sedans, or trucks? What's your budget range?"
    }
    
    return NextResponse.json({ message: response })
  } catch (error) {
    console.error("Error in car-chat API:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
