"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CarFilters } from "@/components/car-filters"
import { CarCard } from "@/components/car-card"
import { CarDetailsModal } from "@/components/car-details-modal"
import { Send, MessageCircle, Car, Search } from 'lucide-react'

// Mock data for cars
const mockCars = [
  {
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: 2023,
    price: 28500,
    mileage: 15000,
    image: "/toyota-camry-modern.png",
    features: ["Hybrid", "Backup Camera", "Bluetooth"],
    mpg: "32/41",
    transmission: "CVT",
    drivetrain: "FWD"
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2022,
    price: 24900,
    mileage: 22000,
    image: "/honda-civic-modern-city.png",
    features: ["Apple CarPlay", "Lane Keeping", "Adaptive Cruise"],
    mpg: "31/40",
    transmission: "CVT",
    drivetrain: "FWD"
  },
  {
    id: 3,
    make: "Ford",
    model: "F-150",
    year: 2023,
    price: 45000,
    mileage: 8000,
    image: "/ford-f150-truck.png",
    features: ["4WD", "Towing Package", "Bed Liner"],
    mpg: "20/24",
    transmission: "10-Speed Automatic",
    drivetrain: "4WD"
  }
]

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your car finder assistant. I can help you find the perfect car based on your preferences. What kind of car are you looking for?"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCar, setSelectedCar] = useState<typeof mockCars[0] | null>(null)
  const [filteredCars, setFilteredCars] = useState(mockCars)

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

  const handleFilterChange = (filters: any) => {
    let filtered = mockCars

    if (filters.make) {
      filtered = filtered.filter(car => 
        car.make.toLowerCase().includes(filters.make.toLowerCase())
      )
    }

    if (filters.minPrice || filters.maxPrice) {
      filtered = filtered.filter(car => {
        const price = car.price
        const min = filters.minPrice || 0
        const max = filters.maxPrice || Infinity
        return price >= min && price <= max
      })
    }

    if (filters.maxMileage) {
      filtered = filtered.filter(car => car.mileage <= filters.maxMileage)
    }

    setFilteredCars(filtered)
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Section */}
        <div className="lg:col-span-2">
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
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
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

        {/* Filters Section */}
        <div>
          <CarFilters onFilterChange={handleFilterChange} />
        </div>
      </div>

      {/* Cars Grid */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-6">
          <Car className="h-5 w-5" />
          <h2 className="text-2xl font-bold">Available Cars</h2>
          <Badge variant="secondary">{filteredCars.length} cars found</Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onViewDetails={() => setSelectedCar(car)}
            />
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No cars found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more results.
            </p>
          </div>
        )}
      </div>

      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          isOpen={!!selectedCar}
          onClose={() => setSelectedCar(null)}
        />
      )}
    </div>
  )
}
