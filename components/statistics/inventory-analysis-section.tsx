"use client"

import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Car, CalendarDays, TrendingUp, Search } from "lucide-react"
import { useMemo } from "react"

// Dummy data for inventory analysis
const dummyInventoryData = {
  totalCars: 40,
  cars: [
    { id: "car1", make: "Toyota", model: "Camry", entryDate: "2025-05-01", daysOnLot: 56, price: 25000 },
    { id: "car2", make: "Honda", model: "Civic", entryDate: "2025-06-10", daysOnLot: 16, price: 22000 },
    { id: "car3", make: "Ford", model: "F-150", entryDate: "2025-04-15", daysOnLot: 72, price: 45000 },
    { id: "car4", make: "Chevrolet", model: "Silverado", entryDate: "2025-06-01", daysOnLot: 25, price: 48000 },
    // Add more cars to reach 40, for brevity, only a few are listed
    ...Array.from({ length: 36 }, (_, i) => ({
      id: `car${i + 5}`,
      make: "Various",
      model: `Model ${i + 1}`,
      entryDate: `2025-0${Math.floor(Math.random() * 6) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
      daysOnLot: Math.floor(Math.random() * 100) + 1,
      price: Math.floor(Math.random() * 30000) + 15000,
    })),
  ],
  topSearchedCars: [
    // Dealer specific
    {
      make: "Toyota",
      model: "Corolla",
      year: 2022,
      price: "$22,000",
      searches: 150,
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      make: "Honda",
      model: "CR-V",
      year: 2021,
      price: "$28,000",
      searches: 120,
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      make: "Ford",
      model: "Explorer",
      year: 2023,
      price: "$42,000",
      searches: 110,
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      make: "Jeep",
      model: "Wrangler",
      year: 2022,
      price: "$38,000",
      searches: 95,
      image: "/placeholder.svg?height=40&width=60",
    },
    {
      make: "Subaru",
      model: "Outback",
      year: 2023,
      price: "$35,000",
      searches: 80,
      image: "/placeholder.svg?height=40&width=60",
    },
  ],
}

export function InventoryAnalysisSection() {
  const totalCapitalTiedUp = useMemo(() => {
    const totalValue = dummyInventoryData.cars.reduce((sum, car) => sum + car.price, 0)
    return (totalValue * 0.8).toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 })
  }, [])

  const averageDaysOnLot = useMemo(() => {
    if (dummyInventoryData.cars.length === 0) return 0
    const totalDays = dummyInventoryData.cars.reduce((sum, car) => sum + car.daysOnLot, 0)
    return (totalDays / dummyInventoryData.cars.length).toFixed(1)
  }, [])

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight mb-6">Inventory Analysis (Your Dealership)</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Total Cars on Lot"
          value={dummyInventoryData.totalCars}
          icon={Car}
          description="Current number of vehicles in inventory."
        />
        <StatCard
          title="Capital Tied Up"
          value={totalCapitalTiedUp}
          icon={DollarSign}
          description="Estimated cost of current inventory (80% of total price)."
        />
        <StatCard
          title="Avg. Days on Lot"
          value={`${averageDaysOnLot} days`}
          icon={CalendarDays}
          description="Average time a car stays in inventory."
        />
        <StatCard
          title="Most Searched Category"
          value="SUVs"
          icon={TrendingUp}
          description="Based on recent search trends on your listings."
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Top 5 Cars in Your Search Results</CardTitle>
          </div>
          <CardDescription>These are your vehicles that appeared most frequently in user searches.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Make & Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Searches</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyInventoryData.topSearchedCars.map((car, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={car.image || "/placeholder.svg"}
                      alt={`${car.make} ${car.model}`}
                      className="h-10 w-15 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {car.make} {car.model}
                  </TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>{car.price}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{car.searches}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}
