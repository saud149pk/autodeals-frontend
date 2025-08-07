import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Car, DollarSign, Calendar, TrendingUp } from 'lucide-react'

// Mock data for inventory analysis
const inventoryData = {
  totalCars: 40,
  totalValue: 4000000, // $4M total value
  capitalTiedUp: 3200000, // 80% of total value
  averageDaysOnLot: 45,
  topSearchedCars: [
    { make: "Toyota", model: "Corolla", year: 2023, price: 25000, searches: 156 },
    { make: "Honda", model: "Civic", year: 2022, price: 24900, searches: 142 },
    { make: "Ford", model: "F-150", year: 2023, price: 45000, searches: 128 },
    { make: "Toyota", model: "Camry", year: 2023, price: 28500, searches: 115 },
    { make: "Nissan", model: "Altima", year: 2022, price: 26800, searches: 98 }
  ]
}

export function InventoryAnalysisSection() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Inventory Analysis</h2>
      
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Cars on Lot"
          value={inventoryData.totalCars}
          description="Current inventory count"
          icon={Car}
        />
        <StatCard
          title="Capital Tied Up"
          value={`$${(inventoryData.capitalTiedUp / 1000000).toFixed(1)}M`}
          description="80% of total inventory value"
          icon={DollarSign}
        />
        <StatCard
          title="Avg. Days on Lot"
          value={inventoryData.averageDaysOnLot}
          description="Average time before sale"
          icon={Calendar}
        />
        <StatCard
          title="Total Inventory Value"
          value={`$${(inventoryData.totalValue / 1000000).toFixed(1)}M`}
          description="Combined value of all cars"
          icon={TrendingUp}
        />
      </div>

      {/* Top 5 Cars in Search Results */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 Cars in Your Search Results</CardTitle>
          <CardDescription>
            Most searched vehicles from your inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Make & Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Searches</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.topSearchedCars.map((car, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {car.make} {car.model}
                  </TableCell>
                  <TableCell>{car.year}</TableCell>
                  <TableCell>${car.price.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{car.searches}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  )
}
