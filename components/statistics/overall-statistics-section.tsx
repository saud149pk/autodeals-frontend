"use client"

import { useState } from "react"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MetropolitanAreaFilter } from "./metropolitan-area-filter"
import { Car, Calendar, DollarSign, Gauge } from 'lucide-react'

// Mock data for overall statistics
const marketData = {
  nationwide: {
    totalCars: 2500000,
    avgAge: 6.2,
    avgMiles: 68000,
    mostPopularType: "SUV",
    typeBreakdown: [
      { type: "SUV", count: 850000, avgDays: 42, avgPrice: 35000, avgAge: 5.8, avgMiles: 62000 },
      { type: "Sedan", count: 720000, avgDays: 38, avgPrice: 28000, avgAge: 6.5, avgMiles: 71000 },
      { type: "Truck", count: 480000, avgDays: 45, avgPrice: 42000, avgAge: 6.0, avgMiles: 65000 },
      { type: "Hatchback", count: 280000, avgDays: 35, avgPrice: 24000, avgAge: 6.8, avgMiles: 74000 },
      { type: "Coupe", count: 170000, avgDays: 52, avgPrice: 31000, avgAge: 6.3, avgMiles: 58000 }
    ]
  },
  "new-york": {
    totalCars: 180000,
    avgAge: 5.9,
    avgMiles: 65000,
    mostPopularType: "Sedan",
    typeBreakdown: [
      { type: "Sedan", count: 68000, avgDays: 35, avgPrice: 32000, avgAge: 5.8, avgMiles: 68000 },
      { type: "SUV", count: 54000, avgDays: 40, avgPrice: 38000, avgAge: 5.5, avgMiles: 58000 },
      { type: "Hatchback", count: 32000, avgDays: 32, avgPrice: 26000, avgAge: 6.2, avgMiles: 72000 },
      { type: "Truck", count: 18000, avgDays: 48, avgPrice: 45000, avgAge: 6.1, avgMiles: 62000 },
      { type: "Coupe", count: 8000, avgDays: 55, avgPrice: 35000, avgAge: 6.0, avgMiles: 55000 }
    ]
  },
  "los-angeles": {
    totalCars: 220000,
    avgAge: 6.0,
    avgMiles: 66000,
    mostPopularType: "SUV",
    typeBreakdown: [
      { type: "SUV", count: 88000, avgDays: 38, avgPrice: 37000, avgAge: 5.6, avgMiles: 60000 },
      { type: "Sedan", count: 66000, avgDays: 36, avgPrice: 30000, avgAge: 6.2, avgMiles: 69000 },
      { type: "Truck", count: 44000, avgDays: 42, avgPrice: 44000, avgAge: 5.9, avgMiles: 63000 },
      { type: "Hatchback", count: 15000, avgDays: 33, avgPrice: 25000, avgAge: 6.5, avgMiles: 71000 },
      { type: "Coupe", count: 7000, avgDays: 50, avgPrice: 33000, avgAge: 6.1, avgMiles: 57000 }
    ]
  }
}

export function OverallStatisticsSection() {
  const [selectedMarket, setSelectedMarket] = useState<keyof typeof marketData>("nationwide")
  const currentData = marketData[selectedMarket]

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Overall Market Statistics</h2>
        <MetropolitanAreaFilter 
          selectedMarket={selectedMarket}
          onMarketChange={setSelectedMarket}
        />
      </div>
      
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Cars for Sale"
          value={currentData.totalCars.toLocaleString()}
          description={selectedMarket === "nationwide" ? "Across all markets" : "In selected market"}
          icon={Car}
        />
        <StatCard
          title="Avg. Car Age"
          value={`${currentData.avgAge} years`}
          description="Average model year age"
          icon={Calendar}
        />
        <StatCard
          title="Avg. Miles per Car"
          value={currentData.avgMiles.toLocaleString()}
          description="Average odometer reading"
          icon={Gauge}
        />
        <StatCard
          title="Most Popular Type"
          value={currentData.mostPopularType}
          description="Highest inventory count"
          icon={DollarSign}
        />
      </div>

      {/* Type-wise Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Type-wise Breakdown</CardTitle>
          <CardDescription>
            Detailed statistics by vehicle type in {selectedMarket === "nationwide" ? "nationwide market" : selectedMarket.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
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
                <TableHead className="text-right">Avg. Miles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.typeBreakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.count.toLocaleString()}</TableCell>
                  <TableCell>{item.avgDays} days</TableCell>
                  <TableCell>${item.avgPrice.toLocaleString()}</TableCell>
                  <TableCell>{item.avgAge} years</TableCell>
                  <TableCell className="text-right">{item.avgMiles.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}
