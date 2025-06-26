"use client"

import { useState, useMemo } from "react"
import { StatCard } from "@/components/ui/stat-card"
import { MetropolitanAreaFilter } from "./metropolitan-area-filter"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Car, Calendar, TrendingUp } from "lucide-react"

// Dummy data for overall statistics
const dummyOverallData = {
  totalCarsForSaleNationwide: 1256789,
  nationwideTypeBreakdown: [
    { type: "SUV", count: 450200, avgDays: 55, avgPrice: 38000, avgAge: 3.2, avgMiles: 32000 },
    { type: "Sedan", count: 380100, avgDays: 50, avgPrice: 29000, avgAge: 3.8, avgMiles: 38000 },
    { type: "Hatchback", count: 150500, avgDays: 48, avgPrice: 22000, avgAge: 3.5, avgMiles: 35000 },
    { type: "Truck", count: 200300, avgDays: 65, avgPrice: 52000, avgAge: 4.1, avgMiles: 45000 },
    { type: "Van", count: 75689, avgDays: 60, avgPrice: 35000, avgAge: 4.0, avgMiles: 42000 },
  ],
  marketData: {
    "New York Metro": {
      totalCars: 85200,
      typeBreakdown: [
        { type: "SUV", count: 30000, avgDays: 52, avgPrice: 40000, avgAge: 3.0, avgMiles: 28000 },
        { type: "Sedan", count: 28000, avgDays: 48, avgPrice: 31000, avgAge: 3.5, avgMiles: 32000 },
      ],
    },
    "Los Angeles Metro": {
      totalCars: 92500,
      typeBreakdown: [
        { type: "SUV", count: 35000, avgDays: 58, avgPrice: 42000, avgAge: 3.3, avgMiles: 35000 },
        { type: "Sedan", count: 30000, avgDays: 53, avgPrice: 33000, avgAge: 3.9, avgMiles: 38000 },
      ],
    },
    "Chicago Metro": {
      totalCars: 68300,
      typeBreakdown: [
        { type: "SUV", count: 25000, avgDays: 54, avgPrice: 39000, avgAge: 3.1, avgMiles: 30000 },
        { type: "Sedan", count: 22000, avgDays: 49, avgPrice: 30000, avgAge: 3.6, avgMiles: 34000 },
      ],
    },
  },
}

const metropolitanAreas = [
  { value: "all", label: "Nationwide" },
  { value: "New York Metro", label: "New York Metro Area" },
  { value: "Los Angeles Metro", label: "Los Angeles Metro Area" },
  { value: "Chicago Metro", label: "Chicago Metro Area" },
]

export function OverallStatisticsSection() {
  const [selectedMarket, setSelectedMarket] = useState<string>("all")

  const currentMarketData = useMemo(() => {
    if (selectedMarket === "all" || !dummyOverallData.marketData[selectedMarket]) {
      return {
        totalCars: dummyOverallData.totalCarsForSaleNationwide,
        typeBreakdown: dummyOverallData.nationwideTypeBreakdown,
      }
    }
    return dummyOverallData.marketData[selectedMarket]
  }, [selectedMarket])

  const averageCarAge = useMemo(() => {
    if (!currentMarketData.typeBreakdown || currentMarketData.typeBreakdown.length === 0) return "N/A"
    const totalAge = currentMarketData.typeBreakdown.reduce((sum, item) => sum + item.avgAge * item.count, 0)
    const totalCount = currentMarketData.typeBreakdown.reduce((sum, item) => sum + item.count, 0)
    return totalCount > 0 ? (totalAge / totalCount).toFixed(1) + " years" : "N/A"
  }, [currentMarketData])

  const averageMiles = useMemo(() => {
    if (!currentMarketData.typeBreakdown || currentMarketData.typeBreakdown.length === 0) return "N/A"
    const totalMiles = currentMarketData.typeBreakdown.reduce((sum, item) => sum + item.avgMiles * item.count, 0)
    const totalCount = currentMarketData.typeBreakdown.reduce((sum, item) => sum + item.count, 0)
    return totalCount > 0
      ? (totalMiles / totalCount).toLocaleString(undefined, { maximumFractionDigits: 0 }) + " miles"
      : "N/A"
  }, [currentMarketData])

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Overall Market Statistics</h2>
        <MetropolitanAreaFilter
          areas={metropolitanAreas}
          selectedArea={selectedMarket}
          onAreaChange={setSelectedMarket}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title={`Total Cars for Sale (${selectedMarket === "all" ? "Nationwide" : selectedMarket})`}
          value={currentMarketData.totalCars.toLocaleString()}
          icon={Car}
        />
        <StatCard
          title="Avg. Car Age"
          value={averageCarAge}
          icon={Calendar}
          description={`In ${selectedMarket === "all" ? "Nationwide" : selectedMarket}`}
        />
        <StatCard
          title="Avg. Miles per Car"
          value={averageMiles}
          icon={TrendingUp}
          description={`In ${selectedMarket === "all" ? "Nationwide" : selectedMarket}`}
        />
        <StatCard
          title="Most Popular Type"
          value={currentMarketData.typeBreakdown[0]?.type || "N/A"}
          icon={BarChart}
          description={`In ${selectedMarket === "all" ? "Nationwide" : selectedMarket}`}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Type-wise Breakdown ({selectedMarket === "all" ? "Nationwide" : selectedMarket})</CardTitle>
          <CardDescription>Detailed statistics for different vehicle types in the selected market.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Avg. Days on Lot</TableHead>
                <TableHead>Avg. Price</TableHead>
                <TableHead>Avg. Age (Yrs)</TableHead>
                <TableHead>Avg. Miles</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentMarketData.typeBreakdown.map((item) => (
                <TableRow key={item.type}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.count.toLocaleString()}</TableCell>
                  <TableCell>{item.avgDays} days</TableCell>
                  <TableCell>
                    {item.avgPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    })}
                  </TableCell>
                  <TableCell>{item.avgAge.toFixed(1)}</TableCell>
                  <TableCell>{item.avgMiles.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}
