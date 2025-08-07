import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MetropolitanAreaFilterProps {
  selectedMarket: string
  onMarketChange: (market: string) => void
}

export function MetropolitanAreaFilter({ selectedMarket, onMarketChange }: MetropolitanAreaFilterProps) {
  return (
    <Select value={selectedMarket} onValueChange={onMarketChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select market" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="nationwide">Nationwide</SelectItem>
        <SelectItem value="new-york">New York Metro</SelectItem>
        <SelectItem value="los-angeles">Los Angeles Metro</SelectItem>
      </SelectContent>
    </Select>
  )
}
