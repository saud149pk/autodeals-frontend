"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, DollarSign, Calendar, TrendingUp, Users, MapPin, BarChart3, Clock } from 'lucide-react'
import { useState } from "react"

// Mock data for inventory analysis
const inventoryData = {
  totalCars: 40,
  totalValue: 4000000,
  capitalTiedUp: 3200000, // 80% of total value
  averageDaysOnLot: 45,
  topSearchedCars: [
    { make: "Toyota", model: "Corolla", year: 2023, price: "$24,500", searches: 156 },
    { make: "Honda", model: "Civic", year: 2023, price: "$26,200", searches: 142 },
    { make: "Ford", model: "F-150", year: 2023, price: "$45,000", searches: 128 },
    { make: "Nissan", model: "Altima", year: 2022, price: "$23,800", searches: 115 },
    { make: "Chevrolet", model: "Malibu", year: 2023, price: "$25,900", searches: 98 }
  ]
}

// Mock data for overall statistics
const overallStats = {
  nationwide: {
    totalCarsForSale: 2500000,
    averageCarAge: 6.2,
    averageMiles: 68500,
    mostPopularType: "SUV",
    typeBreakdown: [
      { type: "SUV", count: 850000, avgDaysOnLot: 42, avgPrice: 35200, avgAge: 5.8, avgMiles: 62000 },
      { type: "Sedan", count: 720000, avgDaysOnLot: 38, avgPrice: 28500, avgAge: 6.5, avgMiles: 71000 },
      { type: "Truck", count: 480000, avgDaysOnLot: 35, avgPrice: 42800, avgAge: 6.0, avgMiles: 65000 },
      { type: "Hatchback", count: 280000, avgDaysOnLot: 45, avgPrice: 22400, avgAge: 6.8, avgMiles: 74000 },
      { type: "Coupe", count: 170000, avgDaysOnLot: 52, avgPrice: 31200, avgAge: 6.2, avgMiles: 58000 }
    ]
  },
  "new-york": {
    totalCarsForSale: 185000,
    averageCarAge: 5.9,
    averageMiles: 64200,
    mostPopularType: "Sedan",
    typeBreakdown: [
      { type: "Sedan", count: 68000, avgDaysOnLot: 32, avgPrice: 32500, avgAge: 5.5, avgMiles: 58000 },
      { type: "SUV", count: 52000, avgDaysOnLot: 38, avgPrice: 38900, avgAge: 5.8, avgMiles: 61000 },
      { type: "Hatchback", count: 35000, avgDaysOnLot: 41, avgPrice: 26800, avgAge: 6.2, avgMiles: 67000 },
      { type: "Coupe", count: 20000, avgDaysOnLot: 48, avgPrice: 35200, avgAge: 6.0, avgMiles: 55000 },
      { type: "Truck", count: 10000, avgDaysOnLot: 45, avgPrice: 48500, avgAge: 6.5, avgMiles: 72000 }
    ]
  },
  "los-angeles": {
    totalCarsForSale: 220000,
    averageCarAge: 6.0,
    averageMiles: 66800,
    mostPopularType: "SUV",
    typeBreakdown: [
      { type: "SUV", count: 88000, avgDaysOnLot: 40, avgPrice: 36800, avgAge: 5.7, avgMiles: 60000 },
      { type: "Sedan", count: 66000, avgDaysOnLot: 36, avgPrice: 29200, avgAge: 6.2, avgMiles: 69000 },
      { type: "Truck", count: 35000, avgDaysOnLot: 33, avgPrice: 44200, avgAge: 5.9, avgMiles: 63000 },
      { type: "Hatchback", count: 20000, avgDaysOnLot: 43, avgPrice: 23800, avgAge: 6.5, avgMiles: 72000 },
      { type: "Coupe", count: 11000, avgDaysOnLot: 50, avgPrice: 32800, avgAge: 6.1, avgMiles: 57000 }
    ]
  }
}

const metropolitanAreas = [
  { value: "nationwide", label: "Nationwide" },
  { value: "new-york", label: "New York Metro" },
  { value: "los-angeles", label: "Los Angeles Metro" },
  { value: "chicago", label: "Chicago Metro" },
  { value: "dallas", label: "Dallas Metro" },
  { value: "houston", label: "Houston Metro" }
]

function StatCard({ title, value, icon: Icon, description, trend }: {
  title: string
  value: string | number
  icon: any
  description?: string
  trend?: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div className="flex items-center pt-1">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">{trend}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function StatisticsPage() {
  const [selectedMarket, setSelectedMarket] = useState<keyof typeof overallStats>("nationwide")
  const currentStats = overallStats[selectedMarket]

  return (
    <div className="container mx-auto py-6 px-4 space-y-8">
      {/* Inventory Analysis Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Inventory Analysis</h2>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Cars on Lot"
            value={inventoryData.totalCars}
            icon={Car}
            description="Current inventory count"
          />
          <StatCard
            title="Capital Tied Up"
            value={`$${(inventoryData.capitalTiedUp / 1000000).toFixed(1)}M`}
            icon={DollarSign}
            description="80% of total inventory value"
          />
          <StatCard
            title="Avg. Days on Lot"
            value={inventoryData.averageDaysOnLot}
            icon={Calendar}
            description="Average across all vehicles"
          />
          <StatCard
            title="Total Inventory Value"
            value={`$${(inventoryData.totalValue / 1000000).toFixed(1)}M`}
            icon={TrendingUp}
            description="Total value of all cars"
          />
        </div>

        {/* Top Searched Cars */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Cars in Your Search Results</CardTitle>
            <CardDescription>Most searched vehicles from your inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Searches</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inventoryData.topSearchedCars.map((car, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {car.make} {car.model}
                    </TableCell>
                    <TableCell>{car.year}</TableCell>
                    <TableCell>{car.price}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{car.searches}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Overall Statistics Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Overall Market Statistics</h2>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <Select value={selectedMarket} onValueChange={(value: keyof typeof overallStats) => setSelectedMarket(value)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {metropolitanAreas.map((area) => (
                  <SelectItem key={area.value} value={area.value}>
                    {area.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Cars for Sale"
            value={currentStats.totalCarsForSale.toLocaleString()}
            icon={Car}
            description={`In ${metropolitanAreas.find(a => a.value === selectedMarket)?.label}`}
          />
          <StatCard
            title="Avg. Car Age"
            value={`${currentStats.averageCarAge} years`}
            icon={Clock}
            description="Average age of vehicles"
          />
          <StatCard
            title="Avg. Miles per Car"
            value={currentStats.averageMiles.toLocaleString()}
            icon={BarChart3}
            description="Average mileage"
          />
          <StatCard
            title="Most Popular Type"
            value={currentStats.mostPopularType}
            icon={Users}
            description="Most common vehicle type"
          />
        </div>

        {/* Type-wise Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Type Breakdown</CardTitle>
            <CardDescription>
              Detailed statistics by vehicle type in {metropolitanAreas.find(a => a.value === selectedMarket)?.label}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Avg. Days on Lot</TableHead>
                  <TableHead>Avg. Price</TableHead>
                  <TableHead>Avg. Age</TableHead>
                  <TableHead>Avg. Miles</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentStats.typeBreakdown.map((type, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{type.type}</TableCell>
                    <TableCell>{type.count.toLocaleString()}</TableCell>
                    <TableCell>{type.avgDaysOnLot} days</TableCell>
                    <TableCell>${type.avgPrice.toLocaleString()}</TableCell>
                    <TableCell>{type.avgAge} years</TableCell>
                    <TableCell>{type.avgMiles.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
