"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Sample car data with detailed specifications - expanded for 4-way comparison
const carDatabase = [
  {
    id: 1,
    make: "Toyota",
    model: "RAV4 Hybrid",
    year: 2023,
    price: "$32,000",
    images: [
      "/toyota-rav4-hybrid.png",
      "/toyota-rav4-hybrid-interior.png",
      "/toyota-rav4-hybrid-rear.png",
    ],
    specs: {
      doors: 5,
      seats: 5,
      bootCapacity: "580 liters",
      wheelSize: "18 inches",
      engine: "2.5L Hybrid",
      horsepower: 219,
      fuelEconomy: "41 city / 38 hwy",
      transmission: "CVT",
      driveType: "AWD",
      length: "180.9 inches",
      width: "73.0 inches",
      height: "67.0 inches",
      weight: "3,710 lbs",
      fuelTank: "14.5 gallons",
      groundClearance: "8.1 inches",
    },
  },
  {
    id: 2,
    make: "Honda",
    model: "Civic",
    year: 2023,
    price: "$23,950",
    images: [
      "/sleek-red-honda-civic.png",
      "/placeholder-lwxoe.png",
      "/honda-civic-rear.png",
    ],
    specs: {
      doors: 4,
      seats: 5,
      bootCapacity: "419 liters",
      wheelSize: "16 inches",
      engine: "2.0L 4-cylinder",
      horsepower: 158,
      fuelEconomy: "33 city / 42 hwy",
      transmission: "CVT",
      driveType: "FWD",
      length: "184.0 inches",
      width: "70.9 inches",
      height: "55.7 inches",
      weight: "2,877 lbs",
      fuelTank: "12.4 gallons",
      groundClearance: "5.3 inches",
    },
  },
  {
    id: 3,
    make: "Tesla",
    model: "Model Y",
    year: 2023,
    price: "$52,990",
    images: [
      "/tesla-model-y.png",
      "/tesla-model-y-interior.png",
      "/tesla-model-y-rear.png",
    ],
    specs: {
      doors: 4,
      seats: 5,
      bootCapacity: "971 liters",
      wheelSize: "19 inches",
      engine: "Dual Electric Motor",
      horsepower: 456,
      fuelEconomy: "122 MPGe",
      transmission: "Single-speed",
      driveType: "AWD",
      length: "187.0 inches",
      width: "75.6 inches",
      height: "63.9 inches",
      weight: "4,416 lbs",
      fuelTank: "N/A",
      groundClearance: "6.6 inches",
    },
  },
  {
    id: 4,
    make: "Ford",
    model: "F-150",
    year: 2023,
    price: "$34,585",
    images: [
      "/ford-f150.png",
      "/ford-f150-interior.png",
      "/ford-f150-rear.png",
    ],
    specs: {
      doors: 4,
      seats: 6,
      bootCapacity: "1,495 liters",
      wheelSize: "20 inches",
      engine: "3.5L V6",
      horsepower: 400,
      fuelEconomy: "25 city / 26 hwy",
      transmission: "10-speed automatic",
      driveType: "4WD",
      length: "231.7 inches",
      width: "79.9 inches",
      height: "77.2 inches",
      weight: "4,021 lbs",
      fuelTank: "26.0 gallons",
      groundClearance: "9.4 inches",
    },
  },
  {
    id: 5,
    make: "BMW",
    model: "X3",
    year: 2023,
    price: "$46,200",
    images: [
      "/bmw-x3.png",
      "/bmw-x3-interior.png",
      "/bmw-x3-rear.png",
    ],
    specs: {
      doors: 4,
      seats: 5,
      bootCapacity: "812 liters",
      wheelSize: "19 inches",
      engine: "2.0L Turbo 4-cylinder",
      horsepower: 248,
      fuelEconomy: "23 city / 29 hwy",
      transmission: "8-speed automatic",
      driveType: "AWD",
      length: "185.9 inches",
      width: "74.4 inches",
      height: "66.0 inches",
      weight: "4,079 lbs",
      fuelTank: "17.2 gallons",
      groundClearance: "8.0 inches",
    },
  },
  {
    id: 6,
    make: "Hyundai",
    model: "Ioniq 5",
    year: 2023,
    price: "$41,450",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    specs: {
      doors: 4,
      seats: 5,
      bootCapacity: "770 liters",
      wheelSize: "19 inches",
      engine: "Electric Motor",
      horsepower: 225,
      fuelEconomy: "114 MPGe",
      transmission: "Single-speed",
      driveType: "RWD",
      length: "182.5 inches",
      width: "74.4 inches",
      height: "63.0 inches",
      weight: "4,246 lbs",
      fuelTank: "N/A",
      groundClearance: "6.1 inches",
    },
  },
  {
    id: 7,
    make: "Kia",
    model: "Telluride",
    year: 2023,
    price: "$35,990",
    images: [
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
      "/placeholder.svg?height=300&width=500",
    ],
    specs: {
      doors: 4,
      seats: 8,
      bootCapacity: "601 liters",
      wheelSize: "20 inches",
      engine: "3.8L V6",
      horsepower: 291,
      fuelEconomy: "20 city / 26 hwy",
      transmission: "8-speed automatic",
      driveType: "FWD",
      length: "196.9 inches",
      width: "78.3 inches",
      height: "68.9 inches",
      weight: "4,112 lbs",
      fuelTank: "18.8 gallons",
      groundClearance: "8.0 inches",
    },
  },
]

// Define the specification categories for the tabs
const specCategories = {
  basic: ["price", "doors", "seats", "bootCapacity", "wheelSize"],
  performance: ["engine", "horsepower", "fuelEconomy", "transmission", "driveType"],
  dimensions: ["length", "width", "height", "weight", "fuelTank", "groundClearance"],
}

// Helper function to format spec names for display
const formatSpecName = (name: string) => {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace("Boot", "Boot/Trunk")
}

export default function ComparisonPage() {
  const [selectedCarIds, setSelectedCarIds] = useState<(number | null)[]>([1, 4, 7, null])
  const [imageIndexes, setImageIndexes] = useState<number[]>([0, 0, 0, 0])

  const selectedCars = selectedCarIds.map(id => carDatabase.find(car => car.id === id) || null)

  const handleCarSelection = (index: number, carId: number | null) => {
    const newSelectedCarIds = [...selectedCarIds]
    newSelectedCarIds[index] = carId
    setSelectedCarIds(newSelectedCarIds)

    // Reset image index for the new car
    const newImageIndexes = [...imageIndexes]
    newImageIndexes[index] = 0
    setImageIndexes(newImageIndexes)
  }

  const handleImageChange = (carIndex: number, direction: 'next' | 'prev') => {
    const car = selectedCars[carIndex]
    if (!car) return

    const newImageIndexes = [...imageIndexes]
    const currentImageIndex = newImageIndexes[carIndex]
    const totalImages = car.images.length

    if (direction === 'next') {
      newImageIndexes[carIndex] = (currentImageIndex + 1) % totalImages
    } else {
      newImageIndexes[carIndex] = (currentImageIndex - 1 + totalImages) % totalImages
    }
    setImageIndexes(newImageIndexes)
  }

  const getBestSpecIndex = (spec: string, cars: (typeof carDatabase[0] | null)[]): number | null => {
    const validCars = cars.map((car, index) => car ? { car, index } : null).filter(Boolean) as { car: typeof carDatabase[0], index: number }[]
    if (validCars.length < 2) return null

    const higherIsBetter = ["horsepower", "bootCapacity", "fuelEconomy", "groundClearance", "seats", "doors"]
    const lowerIsBetter = ["weight", "price"]

    const getValue = (val: any): number => {
      if (typeof val === "number") return val
      if (typeof val === "string") {
        if (val.startsWith('$')) {
          return Number(val.replace(/[$,]/g, ''))
        }
        const numMatch = val.match(/(\d+(\.\d+)?)/)
        return numMatch ? Number.parseFloat(numMatch[0]) : 0
      }
      return 0
    }

    let bestIndex: number | null = null
    let bestValue: number | null = null

    for (const { car, index } of validCars) {
      const value = getValue(spec === 'price' ? car.price : car.specs[spec as keyof typeof car.specs])

      if (bestValue === null) {
        bestValue = value
        bestIndex = index
      } else {
        if (higherIsBetter.includes(spec)) {
          if (value > bestValue) {
            bestValue = value
            bestIndex = index
          }
        } else if (lowerIsBetter.includes(spec)) {
          if (value < bestValue) {
            bestValue = value
            bestIndex = index
          }
        }
      }
    }
    
    const bestCarValue = getValue(spec === 'price' ? validCars.find(c => c.index === bestIndex)?.car.price : validCars.find(c => c.index === bestIndex)?.car.specs[spec as keyof typeof car.specs])
    const isTie = validCars.some(c => c.index !== bestIndex && getValue(spec === 'price' ? c.car.price : c.car.specs[spec as keyof typeof c.car.specs]) === bestCarValue)

    return isTie ? null : bestIndex
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">Car Comparison</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {selectedCarIds.map((carId, index) => (
          <div key={index}>
            <label className="block text-sm font-medium mb-2">Select Car {index + 1}</label>
            <Select
              value={carId?.toString() || ""}
              onValueChange={(value) => handleCarSelection(index, value ? Number(value) : null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose a car" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">None</SelectItem>
                {carDatabase.map((car) => (
                  <SelectItem key={car.id} value={car.id.toString()} disabled={selectedCarIds.includes(car.id) && carId !== car.id}>
                    {car.year} {car.make} {car.model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {selectedCars.map((car, index) => (
          <div key={index}>
            {car ? (
              <>
                <Card>
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold truncate">
                      {car.year} {car.make} {car.model}
                    </h2>
                    <p className="text-lg">{car.price}</p>
                  </CardContent>
                </Card>
                <div className="relative mt-4">
                  <div className="relative h-48 w-full">
                    <Image
                      src={car.images[imageIndexes[index]] || "/placeholder.svg"}
                      alt={`${car.year} ${car.make} ${car.model}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-between px-2">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full opacity-80" onClick={() => handleImageChange(index, 'prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full opacity-80" onClick={() => handleImageChange(index, 'next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {car.images.map((_, imgIndex) => (
                      <div
                        key={imgIndex}
                        className={`h-1.5 w-1.5 rounded-full ${imgIndex === imageIndexes[index] ? "bg-primary" : "bg-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <Card className="flex flex-col items-center justify-center h-full min-h-[280px] border-dashed">
                <CardHeader>
                  <CardTitle>Add a car to compare</CardTitle>
                </CardHeader>
              </Card>
            )}
          </div>
        ))}
      </div>

      {selectedCars.filter(Boolean).length > 0 ? (
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="basic">Basic Specs</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
          </TabsList>

          {Object.entries(specCategories).map(([category, specs]) => (
            <TabsContent key={category} value={category}>
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4 font-medium w-1/5">Specification</th>
                          {selectedCars.map((car, index) => (
                            <th key={index} className="text-left p-4 font-medium w-1/5">
                              {car ? `${car.make} ${car.model}` : `Car ${index + 1}`}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {specs.map((spec) => {
                          const bestIndex = getBestSpecIndex(spec, selectedCars)
                          return (
                            <tr key={spec} className="border-b last:border-0">
                              <td className="p-4 font-medium">{formatSpecName(spec)}</td>
                              {selectedCars.map((car, index) => (
                                <td
                                  key={index}
                                  className={cn(
                                    "p-4",
                                    bestIndex === index ? "text-green-600 font-semibold" : ""
                                  )}
                                >
                                  {car ? (spec === 'price' ? car.price : car.specs[spec as keyof typeof car.specs]) : "-"}
                                </td>
                              ))}
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Select at least one car to see its specifications.</p>
        </div>
      )}
    </div>
  )
}
