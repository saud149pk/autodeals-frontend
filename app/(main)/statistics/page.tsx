import { InventoryAnalysisSection } from "@/components/statistics/inventory-analysis-section"
import { OverallStatisticsSection } from "@/components/statistics/overall-statistics-section"
import { Separator } from "@/components/ui/separator"

export default function StatisticsPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dealership Statistics</h1>
        <p className="text-muted-foreground">Insights into your inventory and overall market trends.</p>
      </header>

      <InventoryAnalysisSection />

      <Separator className="my-12" />

      <OverallStatisticsSection />
    </div>
  )
}
