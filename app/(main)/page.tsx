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
}

const placeholderCars: ChatCar[] = [
  {
    make: "Toyota",
    model: "RAV4",
    year: 2023,
    price: "$34,500",
    image: "/toyota-rav4-forest.png",
    mileage: "15k miles",
    type: "SUV",
    engine: "2.5L 4-Cylinder",
  },
  {
    make: "Honda",
    model: "CR-V",
    year: 2023,
    price: "$36,800",
    image: "/honda-crv.png",
    mileage: "12k miles",
    type: "SUV",
    engine: "1.5L Turbo",
  },
  {
    make: "Hyundai",
    model: "Santa Fe",
    year: 2023,
    price: "$38,200",
    image: "/hyundai-santa-fe.png",
    mileage: "18k miles",
    type: "SUV",
    engine: "2.5L 4-Cylinder",
  },
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  cars?: ChatCar[]
}

const initialMessages: Message[] = [
  { id: '1', role: 'user', content: 'Hey, I am looking for a spacious car.' },
  { id: '2', role: 'assistant', content: 'Sure, what are your color preferences?' },
  { id: '3', role: 'user', content: 'I don\'t have any specifics, but I like light-colored cars.' },
  { id: '4', role: 'assistant', content: 'What is your budget range?' },
  { id: '5', role: 'user', content: 'It\'s under $40k.' },
  { id: '6', role: 'assistant', content: 'Great! Here are some considerations:', cars: placeholderCars },
]
// --- End Placeholder Conversation Setup ---

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
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
                      {message.content}
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
                  placeholder="Ask me about cars..."
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
