"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CarFilters } from "@/components/car-filters"
import ChatCarCard from "@/components/chat-car-card"
import { Send, MessageCircle } from 'lucide-react'

// --- Placeholder Conversation Setup ---
interface ChatCar {
  make: string
  model: string
  year: number
  price: string
  image: string
  mileage: string
  type: string
  engine: string
  financing?: string
}

const complexPlaceholderCars: ChatCar[] = [
  {
    make: "Volvo",
    model: "XC60",
    year: 2023,
    price: "$44,500",
    image: "/volvo-xc60.png",
    mileage: "8k miles",
    type: "SUV",
    engine: "2.0L Turbo",
    financing: "$589",
  },
  {
    make: "Lexus",
    model: "RX 350",
    year: 2023,
    price: "$48,950",
    image: "/lexus-rx350.png",
    mileage: "5k miles",
    type: "SUV",
    engine: "2.4L Turbo",
    financing: "$645",
  },
  {
    make: "Acura",
    model: "MDX",
    year: 2023,
    price: "$49,550",
    image: "/acura-mdx.png",
    mileage: "7k miles",
    type: "SUV",
    engine: "3.5L V6",
    financing: "$655",
  },
]

const newAcuraRDX: ChatCar = {
  make: "Acura",
  model: "RDX",
  year: 2023,
  price: "$43,950",
  image: "/acura-rdx.png",
  mileage: "11k miles",
  type: "SUV",
  engine: "2.0L Turbo",
  financing: "$579",
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  cars?: ChatCar[]
}

const complexInitialMessages: Message[] = [
  { id: '1', role: 'user', content: 'I\'m looking for a reliable SUV that\'s good for long road trips, has advanced safety features, and ideally something that came out in the last two years. I also want to know about financing options.' },
  { id: '2', role: 'assistant', content: 'That\'s a great set of requirements! I can definitely help with that. To start, what\'s your approximate monthly budget for financing?' },
  { id: '3', role: 'user', content: 'I\'d like to keep it under $700/month.' },
  { id: '4', role: 'assistant', content: 'Understood. Based on a typical 60-month loan term with a good credit score, that puts you in a great position for several new and late-model SUVs. Here are a few top contenders that fit your criteria, along with estimated monthly payments:', cars: complexPlaceholderCars },
  { id: '5', role: 'user', content: 'The Volvo looks interesting. You mentioned advanced safety. Can you tell me more about that, and how it compares to the Lexus?' },
  { id: '6', role: 'assistant', content: 'Excellent question! The 2023 Volvo XC60 is renowned for its safety. It comes standard with \'Pilot Assist\', a semi-autonomous driving system that helps with steering, acceleration, and braking on well-marked roads. It also includes \'City Safety\' with collision avoidance for pedestrians, cyclists, and large animals.\n\nThe Lexus RX 350 features \'Lexus Safety System+ 3.0\', which is also very comprehensive, including features like a Pre-Collision System with Pedestrian Detection and All-Speed Dynamic Radar Cruise Control. While both are top-rated, many reviewers give a slight edge to Volvo\'s Pilot Assist for its smoothness in highway driving.' },
  { id: '7', role: 'user', content: 'This is great information, thanks. The Volvo is a strong contender, but keep an eye out for anything similar that might pop up, especially if it has a slightly better price point.' },
  { id: '8', role: 'assistant', content: 'Absolutely! I\'ll continue monitoring the market for you and will let you know if a great match appears.' },
  { id: '9', role: 'assistant', content: '🔔 **New Find!** I\'ve just come across a 2023 Acura RDX with the Technology Package that just hit the market. It\'s very comparable to the XC60, has excellent safety ratings, and is listed at a slightly lower price. Take a look:', cars: [newAcuraRDX] },
]
// --- End Placeholder Conversation Setup ---

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>(complexInitialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/car-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Filters and Chat Section */}
      <div>
        <CarFilters />

        <div className="mt-6">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Car Finder Assistant
              </CardTitle>
              <CardDescription>
                Chat with our AI to find your perfect car
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-1">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex flex-col gap-2 ${
                      message.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                    {message.cars && (
                      <div className="flex gap-4 overflow-x-auto pb-2 w-full">
                        {message.cars.map((car, index) => (
                          <ChatCarCard key={index} car={car} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg px-4 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a follow-up question..."
                  disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
